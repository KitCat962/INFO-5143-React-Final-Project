import { useOutletContext } from "react-router";

export default function useCart() {
    const { useCart } = useOutletContext()
    return useCart
}
