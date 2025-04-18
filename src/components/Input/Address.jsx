import useProvinces from '../../hooks/useProvinces.mjs'
import { AND, ENUM, NULLABLE, STRING, TRIMED_STRING } from '../../scripts/formParser.mjs'
import styles from './Address.module.scss'
import Select from './Select'
import Text from './Text'

export function useAddressTypeDef() {
    const provinces = useProvinces()
    return {
        street: TRIMED_STRING,
        apt: NULLABLE(TRIMED_STRING),
        city: TRIMED_STRING,
        province: ENUM(...Object.keys(provinces)),
        postalcode: AND(TRIMED_STRING, v => [/^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$/.test(v.replace(/\s+/g, '')), v.replace(/\s+/g, '').toUpperCase()])
    }
}

export default function Address({ formName, className, value, disabled, onChange, invalid = {} }) {
    const provinces = useProvinces()
    const { street = '', apt = '', city = '', province = '', postalcode = '' } = value

    const nameRegex = new RegExp(`^${formName}\\-(.*)$`)
    const handleChange = (v, name) => {
        // assume regex is always successful
        const [_, parsedName] = nameRegex.exec(name)
        onChange({
            ...value,
            [parsedName]: v
        }, formName)
    }

    return <div className={[styles.address, className].filter(Boolean).join(' ')}>
        <div className={styles.row}>
            <Text formName={`${formName}-street`}
                className={styles.street}
                label='Street Address'
                value={street}
                onChange={handleChange}
                invalid={invalid.street}
                hint='Street cannot be empty'
                disabled={disabled}
            />
            <Text formName={`${formName}-apt`}
                className={styles.apt}
                label='Apt. #'
                value={apt}
                onChange={handleChange}
                invalid={invalid.apt}
                disabled={disabled}
            />
        </div>
        <div className={styles.row}>
            <Text formName={`${formName}-city`}
                className={styles.city}
                label='City'
                value={city}
                onChange={handleChange}
                invalid={invalid.city}
                hint='City cannot be empty'
                disabled={disabled}
            />
            <Select formName={`${formName}-province`}
                className={styles.province}
                label='Province'
                value={province}
                onChange={handleChange}
                options={Object.entries(provinces).map(([id, label]) => ({ id, label }))}
                invalid={invalid.province}
                hint='Province must be a valid option'
                disabled={disabled}
            />
        </div>
        <Text formName={`${formName}-postalcode`}
            className={styles.postalcode}
            label='Postal Code'
            value={postalcode}
            onChange={handleChange}
            invalid={invalid.postalcode}
            hint='Postal Code must be a 6 characters in proper format. For example: n4h2r8'
            disabled={disabled}
        />
    </div>
}
