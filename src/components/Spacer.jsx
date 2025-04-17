export default function Spacer({ size }) {
    return <div style={{ flexGrow: size ?? 1, flexShrink: 0 }} />
}
