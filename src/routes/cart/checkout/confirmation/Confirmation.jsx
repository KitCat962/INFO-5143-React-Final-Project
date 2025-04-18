import { Link } from "react-router";
import Button from "../../../../components/Buttons/Button";
import Center from "../../../../components/Center";

export default function Confirmation() {
    return <Center style={{ gap: '0.5em' }}>
        <h2>Order Confirmed</h2>
        <p>Your order has been successfully submitted</p>
        <Link to='/'><Button>Home</Button></Link>
    </Center>
}
