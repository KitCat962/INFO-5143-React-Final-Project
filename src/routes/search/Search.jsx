import NumberInput from '../../components/Input/Number'
import SearchInput from '../../components/Input/Search'
import Select from '../../components/Input/Select'
import ProductTile from './ProductTile/ProductTile'
import useCategories from '../../hooks/useCategories.mjs'
import useProducts from '../../hooks/useProducts.mjs'
import styles from './Search.module.scss'
import { useSearchParams } from "react-router"

export default function Search({ }) {
    const [searchParams, setSearchParams] = useSearchParams({
        term: '',
        category: 'all',
        min: '',
        max: ''
    })
    const term = searchParams.get('term'),
        category = searchParams.get('category'),
        min = searchParams.get('min'),
        max = searchParams.get('max')
    const products = useProducts({ category, min, max })
    const categories = useCategories(true)
    const handleChange = (value, name) => {
        const newParams = new URLSearchParams({
            term, category, min, max,
            [name]: value
        })
        setSearchParams(newParams)
    }
    return <div className={styles.search}>
        <div className={styles.sidebar}>
            <SearchInput value={term} onChange={value => handleChange(value, 'term')} />
            <Select label='Filter Category'
                formName='category'
                value={category}
                onChange={handleChange}
                options={Object.entries(categories ?? {}).map(([id, label]) => ({ id, label }))}
            />
            <NumberInput formName='min'
                label='Minimum Price'
                value={min}
                onChange={handleChange}
                min={0}
                step={0.01}
            />
            <NumberInput formName='max'
                label='Maximum Price'
                value={max}
                onChange={handleChange}
                min={0}
                step={0.01}
            />
        </div>
        <div className={styles.productlist}>
            {products && products.map(product => <ProductTile
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
            />
            )}
        </div>
    </div>
}
