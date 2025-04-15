import styles from './Select.module.scss'
import InputBase from './InputBase'
import { useId, useRef, useState } from 'react'
import Button from '../Buttons/Button'
import { FaChevronDown } from 'react-icons/fa'

export default function Select({ formName, className, label, hint, value, onChange, options }) {
    const id = useId()
    const inputId = `${id}-input`
    const hintId = `${id}-hint`

    const searchinput = useRef(null)
    const optionlist = useRef(null)

    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const filterOptions = () => {
        if (!search) {
            return options;
        }
        const lower_search = search.toLowerCase()
        return options.filter(option =>
            option.label.toLowerCase().includes(lower_search) ||
            option.id.toLowerCase().includes(lower_search)
        )
    }
    const handleClick = option => {
        setSearch('')
        setSearching(false)
        onChange(option.id, formName)
    }
    const handleKeyPress = e => {
        if (e.code === 'Enter') {
            e.preventDefault()
            if (optionlist.current.childElementCount === 1) {
                handleClick(options[0])
            } else if (optionlist.current.childElementCount > 1) {
                optionlist.current.firstElementChild.firstElementChild.focus()
            }
        } else if (e.code === 'ArrowDown') {
            if(!searching)
                setSearching(true)
            e.preventDefault()
            if (optionlist.current.childElementCount >= 1)
                optionlist.current.firstElementChild.firstElementChild.focus()
        }
    }
    const handleKeyPressOption = (e, option) => {
        if (e.code === 'ArrowUp') {
            e.preventDefault()
            let target = e.target
            if (target.childElementCount === 0)
                target = target.parentElement
            if (target.previousElementSibling)
                target.previousElementSibling.firstElementChild.focus()
            else
                searchinput.current.focus()
        } else if (e.code === 'ArrowDown') {
            e.preventDefault()
            let target = e.target
            if (target.childElementCount === 0)
                target = target.parentElement
            if (target.nextElementSibling)
                target.nextElementSibling.firstElementChild.focus()
        } else if(e.code === 'Enter') {
            searchinput.current.focus()
            handleClick(option)
        }
    }

    return <InputBase id={id} label={label} className={className} hint={hint} >
        <div className={styles.select} onBlur={e => !e.currentTarget.contains(e.relatedTarget) && setSearching(false)}>
            <div className={styles.container}>
                <input
                    ref={searchinput}
                    className={styles.input}
                    id={inputId}
                    name={formName}
                    type={'text'}
                    placeholder={options.find(option => option.id === value)?.label ?? options[0]?.label ?? 'Select'}
                    value={search}
                    onChange={e => { setSearching(true); setSearch(e.target.value) }}
                    onFocus={e => search && setSearching(true)}
                    onKeyDown={handleKeyPress}

                    aria-describedby={hint && hintId}
                />
                <Button className={styles.button} onClick={() => setSearching(!searching)}>
                    <FaChevronDown />
                </Button>
            </div>
            <div ref={optionlist} className={[styles.optionlist, searching && styles.visible].filter(Boolean).join(' ')}>
                {filterOptions().map(option => <div key={option.id} onKeyDown={e => handleKeyPressOption(e, option)}><Option
                    id={option.id}
                    label={option.label}
                    onClick={handleClick}
                /></div>)}
            </div>
        </div>
    </InputBase>
}

function Option({ id, label, onClick }) {
    return <Button className={styles.option} onClick={() => onClick({ id, label })}>{label}</Button>
}