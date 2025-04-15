export default function Center({children, className}) {
    return <div style={{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'center'
    }} className={className}>
        {children}
    </div>
}