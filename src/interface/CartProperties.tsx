interface CartProperties {
    items: CartEntry[]
}

interface CartEntry {
    ID: string
    quantity: number
}

export default CartProperties
