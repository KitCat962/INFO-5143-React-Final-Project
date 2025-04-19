import { useEffect, useState } from 'react'
import styles from './Checkout.module.scss'
import Text from '../../../components/Input/Text'
import Button from '../../../components/Buttons/Button'
import { useNavigate } from 'react-router'
import Address, { useAddressTypeDef } from '../../../components/Input/Address'
import Center from '../../../components/Center'
import Spacer from '../../../components/Spacer'
import Checkbox from '../../../components/Input/Checkbox'
import checkType, { AND, BOOLEAN_ISH, checkInvalid, debugType, EMAIL, NULLABLE, NUMBER_ISH, STRING, TRIMED_STRING } from '../../../scripts/formParser.mjs'
import useCart from '../../../hooks/UseCart.mjs'
import useProducts from '../../../hooks/useProducts.mjs'
import Spinner from '../../../components/Spinner/Spinner'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../scripts/firebase'
import useProvinces from '../../../hooks/useProvinces.mjs'
import Modal from '../../../components/Modal/Modal'
import useAuth from '../../../hooks/useAuth.mjs'

export default function Checkout({ }) {
    const navigate = useNavigate()
    const [user] = useAuth()
    const [cart, setProduct, resetCart] = useCart(user)
    const [products, productsMap] = useProducts()
    const provinces = useProvinces()
    const [state, setState] = useState('shipping')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {},

        cardNumber: '',
        cardYear: '',
        cardMonth: '',
        cardCVC: '',

        billingSameAsShipping: false,
        billingFirstName: '',
        billingLastName: '',
        billingAddress: {}
    })
    const priceList = cart && productsMap
        ? cart.map(({ id, count }) => ({
            id,
            count,
            name: productsMap[id].name,
            price: productsMap[id].price,
            total: productsMap[id].price * count
        }))
        : null
    const subtotal = priceList ? priceList.reduce((prev, { total }) => prev + total, 0) : 0
    const total = subtotal * 1.13
    const ADDRESS = useAddressTypeDef()
    const typedefShipping = {
        firstName: TRIMED_STRING,
        lastName: TRIMED_STRING,
        email: EMAIL,
        phoneNumber: NULLABLE(STRING),
        address: ADDRESS,
    }
    const typedefBilling = {
        // Canadian credit cards always have 16 digits. I am not accounting for people outside of canada right now
        cardNumber: AND(TRIMED_STRING, v => [/^[0-9]{16}$/.test(v), v]),
        cardYear: AND(TRIMED_STRING, AND(NUMBER_ISH, v => [v >= 0 && v <= 99, v])),
        cardMonth: AND(TRIMED_STRING, AND(NUMBER_ISH, v => [v >= 1 && v <= 12, v])),
        cardCVC: AND(TRIMED_STRING, v => [/^[0-9]{3}$/.test(v), v]),

        billingSameAsShipping: BOOLEAN_ISH,
        billingFirstName: TRIMED_STRING,
        billingLastName: TRIMED_STRING,
        billingAddress: ADDRESS,
    }
    const typedefAll = {
        ...typedefShipping,
        ...typedefBilling,
    }
    const [invalid, setInvalid] = useState({})

    const handleChange = (value, name) => {
        const newFormData = { ...formData, [name]: value }
        setFormData(newFormData)
        setInvalid({ ...invalid, [name]: checkInvalid(typedefAll[name], value) })
    }
    const handleBillingSameAsShipping = (value, name) => {
        let newFormData = {
            ...formData,
            [name]: value,
        }
        setFormData(newFormData)
    }
    useEffect(() => {
        let newFormData = {
            ...formData,
            billingFirstName: formData.firstName,
            billingLastName: formData.lastName,
            billingAddress: formData.address
        }
        if (formData.billingSameAsShipping) {
            setFormData(newFormData)
        }
        setInvalid({
            ...invalid,
            billingFirstName: checkInvalid(typedefAll.billingFirstName, newFormData.billingFirstName),
            billingLastName: checkInvalid(typedefAll.billingLastName, newFormData.billingLastName),
            billingAddress: checkInvalid(typedefAll.billingAddress, newFormData.billingAddress),
        })
    }, [formData.billingSameAsShipping, formData.firstName, formData.lastName, formData.address])

    const handleNext = next => {
        if (state === 'shipping') {
            const [valid, _] = checkType(typedefShipping, formData)
            if (!valid) {
                setInvalid(checkInvalid(typedefShipping, formData))
                return
            }
        }
        if (state === 'billing') {
            const [valid, _] = checkType(typedefBilling, formData)
            if (!valid) {
                setInvalid(checkInvalid(typedefBilling, formData))
                return
            }
        }
        setState(next)
    }

    const [modalVisible, setModalVisible] = useState(false)
    const handleSubmit = async () => {
        const [allValid, formParsed] = checkType(typedefAll, formData)
        if (!allValid) {
            const [shippingValid, shippingParsed] = checkType(typedefShipping, formData)
            if (!shippingValid) {
                setState('shipping')
                setInvalid(checkInvalid(typedefShipping, formData))
                return
            }
            const [billingValid, billingParsed] = checkType(typedefBilling, formData)
            if (!billingValid) {
                setState('shipping')
                setInvalid(checkInvalid(typedefBilling, formData))
                return
            }
            // one of the above should have worked
            console.error('Form is invalid, but neither shipping nor billing can claim it. FIX IT')
            setState('shipping')
            return
        }
        try {
            await addDoc(collection(db, 'orders'), {
                userUID: user.uid,
                products: cart,
                // yes I know card data is being thrown here unencrypted. I dont care right now
                ...formParsed
            })
            resetCart()
            navigate('confirmation')
        } catch (e) {
            console.error(e)
            setModalVisible(true)
        }
    }

    const handleState = () => {
        if (state === 'shipping') return <>
            <p className={styles.formheader}>Shipping Information</p>
            <div className={styles.row}>
                <Text formName='firstName'
                    label='First Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    invalid={invalid.firstName}
                    hint='First Name cannot be empty'
                />
                <Text formName='lastName'
                    label='Last Name'
                    value={formData.lastName}
                    onChange={handleChange}
                    invalid={invalid.lastName}
                    hint='Last Name cannot be empty'
                />
            </div>
            <div className={styles.row}>
                <Text formName='email'
                    label='Email'
                    value={formData.email}
                    onChange={handleChange}
                    invalid={invalid.email}
                    hint='Email must be valid'
                    email
                />
                <Text formName='phoneNumber'
                    label='Phone Number'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    invalid={invalid.phoneNumber}
                />
            </div>
            <Address formName='address'
                className={styles.address}
                value={formData.address}
                onChange={handleChange}
                invalid={invalid.address}
            />
            <div className={styles.buttonrow}>
                <Button onClick={() => handleNext('billing')}>
                    To Billing
                </Button>
                <Button type='tertiary' onClick={() => navigate('/cart')}>
                    Back To Cart
                </Button>
            </div>
        </>
        if (state === 'billing') return <>
            <p className={styles.formheader}>Billing Information</p>
            <Text formName='cardNumber'
                label='Card Number'
                value={formData.cardNumber}
                onChange={handleChange}
                invalid={invalid.cardNumber}
                hint={<span>Card Number must be a 16 digit number <br /> We do not accept credit cards outside of Canada</span>}
            />
            <div className={styles.cardFields}>
                <Text formName='cardMonth'
                    className={styles.cardMonth}
                    label='Month'
                    placeholder='MM'
                    value={formData.cardMonth}
                    onChange={handleChange}
                    invalid={invalid.cardMonth}
                    hint='Month must be a 2 digit number between 1 and 12'
                />
                <Text formName='cardYear'
                    className={styles.cardYear}
                    label='Year'
                    placeholder='YY'
                    value={formData.cardYear}
                    onChange={handleChange}
                    invalid={invalid.cardYear}
                    hint='Year must be a 2 digit number between 00 and 99'
                />
                <Text formName='cardCVC'
                    className={styles.cardCVC}
                    label='CVC'
                    placeholder='###'
                    value={formData.cardCVC}
                    onChange={handleChange}
                    invalid={invalid.cardCVC}
                    hint='CVC must be a 3 digit code'
                />
                <Spacer size={10} />
            </div>
            <Checkbox formName='billingSameAsShipping'
                className={styles.billingSameAsShipping}
                label='Same as Shipping Address'
                value={formData.billingSameAsShipping}
                onChange={handleBillingSameAsShipping}
            />
            <div className={styles.row}>
                <Text formName='billingFirstName'
                    label='First Name'
                    value={formData.billingFirstName}
                    onChange={handleChange}
                    invalid={invalid.billingFirstName}
                    hint='First Name cannot be empty'
                    disabled={formData.billingSameAsShipping}
                />
                <Text formName='billingLastName'
                    label='Last Name'
                    value={formData.billingLastName}
                    onChange={handleChange}
                    invalid={invalid.billingLastName}
                    hint='Last Name cannot be empty'
                    disabled={formData.billingSameAsShipping}
                />
            </div>
            <Address formName='billingAddress'
                className={styles.address}
                value={formData.billingAddress}
                onChange={handleChange}
                invalid={invalid.billingAddress}
                disabled={formData.billingSameAsShipping}
            />
            <div className={styles.buttonrow}>
                <Button onClick={() => handleNext('review')}>
                    Review Order
                </Button>
                <Button type='tertiary' onClick={() => setState('shipping')}>
                    Back To Shipping
                </Button>
            </div>
        </>
        if (state === 'review') {
            const [_, displayValues] = checkType(debugType(typedefAll), formData)
            return <>
                <p className={styles.formheader}>Review Order</p>
                <div className={styles.infodump}>
                    <p className={styles.formheader}>Ship To</p>
                    <p className={styles.info}>
                        {`
                            ${displayValues.firstName} ${displayValues.lastName}
                            ${displayValues.address.apt ? `${displayValues.address.apt} - ${displayValues.address.street}` : displayValues.address.street}
                            ${displayValues.address.city} ${provinces?.[displayValues.address.province] ?? displayValues.address.province} ${displayValues.address.postalcode}
                            Canada
                        `.trim()}
                    </p>
                </div>
                <hr />
                <div className={styles.infodump}>
                    <p className={styles.formheader}>Bill To</p>
                    <p className={styles.info}>
                        {`
                            ${displayValues.cardNumber}
                            Expire Month: ${displayValues.cardYear}/${displayValues.cardMonth}
                            CVC: ${displayValues.cardCVC}

                            ${displayValues.billingSameAsShipping ?
                                `${displayValues.firstName} ${displayValues.lastName}
                                ${displayValues.address.apt ? `${displayValues.address.apt} - ${displayValues.address.street}` : displayValues.address.street}
                                ${displayValues.address.city} ${provinces?.[displayValues.address.province] ?? displayValues.address.province} ${displayValues.address.postalcode}`
                                : `${displayValues.billingFirstName} ${displayValues.billingLastName}
                                ${displayValues.billingAddress.apt ? `${displayValues.billingAddress.apt} - ${displayValues.billingAddress.street}` : displayValues.billingAddress.street}
                                ${displayValues.billingAddress.city} ${provinces?.[displayValues.address.province] ?? displayValues.address.province} ${displayValues.billingAddress.postalcode}`
                            }
                            Canada
                        `.trim()}
                    </p>
                </div>
                <hr />
                <div className={styles.pricedump}>
                    {priceList ? priceList.map(({ id, count, name, price, total }) => <div key={id} className={styles.subpricedump}>
                        <p>{name}</p>
                        <Spacer />
                        <p>${price.toFixed(2)} x ${count}</p>
                        <p>${total.toFixed(2)}</p>
                    </div>)
                        : <Center><Spinner /></Center>}
                </div>
                <hr />
                <div className={styles.total}>
                    <p>Order Subtotal: ${subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className={styles.pricedump}>
                    <div className={styles.subpricedump}>
                        <p>Order Subtotal:</p>
                        <Spacer />
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className={styles.subpricedump}>
                        <p>Promotions:</p>
                        <Spacer />
                        <p>- ${(0).toFixed(2)}</p>
                    </div>
                    <div className={styles.subpricedump}>
                        <p>Tax (%13):</p>
                        <Spacer />
                        <p>+ ${(subtotal * 0.13).toFixed(2)}</p>
                    </div>
                </div>
                <hr />
                <div className={styles.total}>
                    <p className={styles.real}>Order Total: ${total.toFixed(2)}</p>
                </div>
                <div className={styles.buttonrow}>
                    <Button type='positive' onClick={handleSubmit}>
                        Confirm Order
                    </Button>
                    <Button type='tertiary' onClick={() => setState('billing')}>
                        Back To Billing
                    </Button>
                </div>
            </>
        }
        setState('shipping')
    }

    return <>
        <Modal visible={modalVisible} requestClose={() => setModalVisible(false)}><div style={{ gap: '1em' }}>
            <h2>Something went wrong</h2>
            <div style={{ flexDirection: 'row', justifyContent: 'end' }}>
                <Button type='tertiary' onClick={() => setModalVisible(false)}>Close</Button>
            </div></div>
        </Modal>
        <Center className={styles.checkout}>
            <h2 className={styles.header}>
                Checkout
            </h2>
            <form className={styles.form}>
                {handleState()}
            </form>
        </Center>
    </>
}
