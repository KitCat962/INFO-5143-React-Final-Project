import styles from './NewProduct.module.scss'
import Center from "../../../../components/Center";
import { useEffect, useState } from 'react';
import checkType, { AND, ENUM, NUMBER_ISH, TRIMED_STRING } from '../../../../scripts/formParser.mjs';
import Button from '../../../../components/Buttons/Button';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../scripts/firebase';
import Number from '../../../../components/Input/Number';
import Text from '../../../../components/Input/Text';
import Select from '../../../../components/Input/Select';

const formInit = {
    productName: '',
    productDescription: '',
    productCategory: '',
    productPrice: 0,
    image: null,
}
export default function NewProduct({ }) {
    const [formData, setFormData] = useState(formInit)
    const [categories, setCategories] = useState({})
    useEffect(() => {
        return onSnapshot(doc(db, 'product_data', 'categories'), doc => setCategories(doc.data() || {}))
    }, [])

    const productDefinition = {
        productName: TRIMED_STRING,
        productDescription: TRIMED_STRING,
        productCategory: ENUM(...Object.keys(categories)),
        productPrice: AND(NUMBER_ISH, v => [v >= 0, Math.floor(v*100)/100]),
        imageURL: TRIMED_STRING,
    }
    const handleChange = (value, index) => {
        setFormData({
            ...formData,
            [index]: value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const [valid, product] = checkType(productDefinition, formData)
        if (!valid) return
        const response = await addDoc(collection(db, 'products'), product)
        setFormData(formInit)
    }
    return <Center className={styles.newProduct}>
        <h2 className={styles.title}>New Product</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Text formName='productName' label='Product Name' value={formData.productName} onChange={handleChange} />
            <Text formName='productDescription' label='Product Description' value={formData.productDescription} onChange={handleChange} />
            <Number formName='productPrice' label='Product Price' value={formData.productPrice} onChange={handleChange} min={0} />
            <Select
                formName='productCategory'
                label='Category'
                value={formData.productCategory}
                onChange={handleChange}
                options={
                    Object.entries(categories)
                        .sort((a, b) => a[1] > b[1])
                        .map(([id, label]) => ({ id, label }))
                }
            />
            <Text formName='imageURL' label='ImageURL' value={formData.imageURL} onChange={handleChange} />
            <Button submit>Create New Product</Button>
        </form>
    </Center>
}