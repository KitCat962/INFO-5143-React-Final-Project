// Union Constructors
export const OR = (typeA, typeB) => v => {
    const [valid, value] = checkType(typeA, v)
    if (valid) return [valid, value]
    return checkType(typeB, v)
}
export const AND = (typeA, typeB) => v => {
    const [valid, value] = checkType(typeA, v)
    if (!valid) return [valid, value]
    return checkType(typeB, value)
}
export const DEFAULT = (type, _default) => v => {
    const [valid, value] = checkType(type, v)
    return [true, valid ? value : _default]
}

// Modifier Constructors
export const NULLABLE = type => OR(NULL, type)
export const STRING_N = length => AND(STRING, v => [v.length <= length, v])
export const ARRAY_T = type => AND(ARRAY, v => {
    const vv = v.map(value => checkType(type, value)).filter(([valid, value]) => valid).map(([valid, value]) => value)
    return [vv.length === v.length, vv]
})
export const ENUM = (...values) => v => {
    const value = values.find(value => value === v)
    return [!!value, value]
}

// Primitives
export const ANY = v => [v != undefined, v]
export const NULL = v => [v == undefined, null]
export const BOOLEAN = typeof true
export const FLOAT = typeof 0
export const NUMBER = AND(FLOAT, v => [Number.isFinite(v), v])
export const INTEGER = v => [Number.isSafeInteger(v), v]
export const STRING = typeof ''
export const ARRAY = v => [Array.isArray(v), v]

// Loosey Primitives
export const BOOLEAN_ISH = v => [true, !!v]
export const FLOAT_ISH = v => [true, +v]
export const NUMBER_ISH = v => [Number.isFinite(Number(v)), Number(v)]
export const INTEGER_ISH = v => {
    const parsedInt = parseInt(v, 10)
    return [!Number.isNaN(parsedInt), parsedInt]
}
export const STRING_ISH = v => [true, String(v)]

// Custom Types
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const EMAIL = AND(STRING, v => [emailRegex.test(v), v])
export const TRIMED_STRING = AND(STRING, v => [v.trim().length > 0, v.trim()])

// Magic happens here
export default function checkType(type, value) {
    if (typeof type === 'string')
        return [typeof value === type, value]
    if (typeof type === 'function')
        return type(value)
    if (!value)
        return [false, value]
    const ret = {}
    let validRet = true
    for (let [key, keyType] of Object.entries(type)) {
        const [valid, keyValue] = checkType(keyType, value[key])
        ret[key] = keyValue
        if (!valid)
            validRet = false
    }
    return [validRet, ret]
}

export function debugType(type, path = '') {
    if (typeof type === 'string')
        return DEFAULT(v => [typeof v === type, v], `${path}_invalid`)
    if (typeof type === 'function')
        return DEFAULT(type, `${path}_invalid`)

    const deftypeDebug = {}
    for (let [field, t] of Object.entries(type)) {
        deftypeDebug[field] = debugType(t, `${path}_${field}`)
    }
    return DEFAULT(deftypeDebug, `${path}_null`)
}

export function checkInvalid(type, value) {
    const [valid, data] = checkType(type, value)
    if (valid) return false
    if (!data) return true
    if (typeof data !== 'object') return true
    const subInvalid = {}
    for (let [field, value] of Object.entries(data)) {
        subInvalid[field] = checkInvalid(type[field], value)
    }
    return subInvalid
}
