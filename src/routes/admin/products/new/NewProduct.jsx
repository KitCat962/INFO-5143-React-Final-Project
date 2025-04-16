import styles from './NewProduct.module.scss'
import Center from "../../../../components/Center";
import { useEffect, useState } from 'react';
import checkType, { AND, ANY, ENUM, NUMBER_ISH, TRIMED_STRING } from '../../../../scripts/formParser.mjs';
import Button from '../../../../components/Buttons/Button';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../scripts/firebase';
import Number from '../../../../components/Input/Number';
import Text from '../../../../components/Input/Text';
import Select from '../../../../components/Input/Select';
import File from '../../../../components/Input/File';

const formInit = {
    name: '',
    description: '',
    category: '',
    price: 0,
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
        productPrice: AND(NUMBER_ISH, v => [v >= 0, Math.floor(v * 100) / 100]),
        image: ANY,
    }
    const handleChange = (value, index) => {
        console.log(value, index)
        setFormData({
            ...formData,
            [index]: value
        })
    }
    const handleSubmit = async e => {
        const base64EncodeFile = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
                resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(file);
        })

        e.preventDefault()
        const [valid, parsedFormData] = checkType(productDefinition, formData)
        if (!valid) return
        const base64Image = await base64EncodeFile(parsedFormData.image)
        console.log(base64Image)
        const product = {
            ...parsedFormData,
            image: base64Image
        }
        console.log(product)
        const response = await addDoc(collection(db, 'products'), product)
        setFormData(formInit)
    }
    return <Center className={styles.newProduct}>
        <h2 className={styles.title}>New Product</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Text formName='name' label='Product Name' value={formData.name} onChange={handleChange} />
            <Text formName='description' label='Product Description' value={formData.description} onChange={handleChange} />
            <Number formName='price' label='Product Price' value={formData.price} onChange={handleChange} min={0} />
            <Select
                formName='category'
                label='Category'
                value={formData.category}
                onChange={handleChange}
                options={
                    Object.entries(categories)
                        .sort((a, b) => a[1] > b[1])
                        .map(([id, label]) => ({ id, label }))
                }
            />
            <File formName='image' label='Image' value={formData.image} onChange={handleChange} image />
            <Button submit>Create New Product</Button>
        </form>
    </Center>
}