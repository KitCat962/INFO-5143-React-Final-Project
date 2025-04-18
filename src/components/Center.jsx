export default function Center({ children, className, style = {} }) {
    return <div style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        ...style
    }} className={className}>
        {children}
    </div>
}
