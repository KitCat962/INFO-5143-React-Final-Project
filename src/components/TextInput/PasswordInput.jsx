import InputBase from "./InputBase";

export default function PasswordInput({id, value, onChange}) {
    return <InputBase id={id} class='password' label='Password' type='password' className='password' value={value} onChange={onChange} />
}