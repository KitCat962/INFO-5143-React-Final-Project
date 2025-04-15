import './InputBase.scss'
export default function InputBase({id, label, value, onChange, type, className}) {
    const realID = `input-${id}`
    return <div className='input'>
        <label htmlFor={realID}>{label}</label>
        <input id={realID} name={id} type={type} value={value} onChange={e=>onChange(e.target.value)} className={className}/>
    </div>
}