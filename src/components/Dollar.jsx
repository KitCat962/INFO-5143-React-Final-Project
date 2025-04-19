export default function Dollar({ children, className }) {
    return <span className={className} style={{ flexDirection: 'row', alignItems: 'start' }}>
        <span style={{ fontSize: '0.6em' }}>$</span>
        {children}
    </span>
}
