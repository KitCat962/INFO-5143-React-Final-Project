import InputBase from "./InputBase";

export default function EmailInput({id, value, onChange}) {
    return <InputBase id={id} class='email' label='Email' type='email' className='email' value={value} onChange={onChange} />
}