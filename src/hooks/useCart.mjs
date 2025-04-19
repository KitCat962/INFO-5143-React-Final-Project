import { useOutletContext } from "react-router";

/**
 * @typedef {Object} CartProductVal
 * @property {string} id
 * @property {integer} count
 */

/**
 * @callback TypeSetProduct
 * @param {string} id
 * @param {integer} count
 * @param {boolean?} increment
 * @returns {void}
 */

/**
 * 
 * @returns {[CartProductVal[], TypeSetProduct]}
 */
export default function useCart() {
    const { useCart } = useOutletContext()
    return useCart
}
