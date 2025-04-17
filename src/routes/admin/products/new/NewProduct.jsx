import styles from './NewProduct.module.scss'
import Center from "../../../../components/Center";
import { useEffect, useState } from 'react';
import checkType, { AND, ANY, ENUM, NUMBER_ISH, TRIMED_STRING } from '../../../../scripts/formParser.mjs';
import Button from '../../../../components/Buttons/Button';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../scripts/firebase';
import NumberInput from '../../../../components/Input/Number';
import Text from '../../../../components/Input/Text';
import Select from '../../../../components/Input/Select';
import File from '../../../../components/Input/File';
import useCategories from '../../../../hooks/useCategories.mjs';

const formInit = {
    name: '',
    description: '',
    category: '',
    price: 0,
    image: null,
}
export default function NewProduct({ }) {
    const [formData, setFormData] = useState(formInit)
    const categories = useCategories()
    const [error, setError] = useState(null)

    const productDefinition = {
        name: TRIMED_STRING,
        description: TRIMED_STRING,
        category: ENUM(...Object.keys(categories ?? {})),
        price: AND(NUMBER_ISH, v => [v >= 0, Math.floor(v * 100) / 100]),
        image: ANY,
    }
    const handleChange = (value, index) => {
        setFormData({
            ...formData,
            [index]: value
        })
    }
    const handleSubmit = async e => {
        const base64EncodeFile = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                // console.log('RESULT', reader.result)
                resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(file);
        })

        e.preventDefault()
        const [valid, parsedFormData] = checkType(productDefinition, formData)
        if (!valid) {
            if (!parsedFormData.price)
                setError('Price is invalid')
            else if (!parsedFormData.category)
                setError('Category is invalid')
            else if (!parsedFormData.image)
                setError('Image is invalid??? Why?')
            else
                setError('Something is invalid. I am just as confused as you are')
            return
        }
        setError(null)
        const base64Image = await base64EncodeFile(parsedFormData.image)
        const product = {
            ...parsedFormData,
            image: base64Image
        }
        const response = await addDoc(collection(db, 'products'), product)
        setFormData(formInit)
    }
    return <Center className={styles.newProduct}>
        <h2>New Product</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Text formName='name' label='Product Name' value={formData.name} onChange={handleChange} />
            <Text formName='description' label='Product Description' value={formData.description} onChange={handleChange} />
            <NumberInput formName='price' label='Product Price' value={formData.price} onChange={handleChange} min={0} step={0.01} />
            <Select
                formName='category'
                label='Category'
                placeholder='Select Category'
                value={formData.category}
                onChange={handleChange}
                options={
                    Object.entries(categories ?? {})
                        .sort((a, b) => a[1] > b[1])
                        .map(([id, label]) => ({ id, label }))
                }
            />
            <File formName='image' label='Image' value={formData.image} onChange={handleChange} image />
            <Button submit>Create New Product</Button>
            {error && <p>{error}</p>}
        </form>
    </Center>
}
