import styles from './NewProduct.module.scss'
import Center from "../../../../components/Center";
import { useState } from 'react';
import checkType, { AND, NUMBER_ISH, TRIMED_STRING } from '../../../../scripts/formParser.mjs';
import Button from '../../../../components/Buttons/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../scripts/firebase';
import Number from '../../../../components/Input/Number';
import Text from '../../../../components/Input/Text';

const productDefinition = {
    productName: TRIMED_STRING,
    productDescription: TRIMED_STRING,
    productCategory: TRIMED_STRING,
    productPrice: AND(NUMBER_ISH, v => [v >= 0, v]),
    imageURL: TRIMED_STRING,
}
const formInit = {
    productName: '',
    productDescription: '',
    productCategory: '',
    productPrice: 0,
    image: null,
}
export default function NewProduct({ }) {
    const [formData, setFormData] = useState(formInit)
    const handleChange = (value, index) => {
        console.log(value, index)
        setFormData({
            ...formData,
            [index]: value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const [valid, product] = checkType(productDefinition, formData)
        console.log(product)
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
            <Text formName='imageURL' label='ImageURL' value={formData.imageURL} onChange={handleChange} />
            <Button submit>Create New Product</Button>
        </form>
    </Center>
}