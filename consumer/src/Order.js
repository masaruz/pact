require('dotenv')
const fetch = require('node-fetch')

class Order {
    constructor(id, items) {
        this.id = id
        this.items = items
    }

    total() {
        return this.items.reduce((acc, v) => {
            acc += v.quantity * v.value
            return acc
        }, 0)
    }

    toString() {
        return `Order ${this.id}, Total: ${this.total()}`
    }
}

const fetchOrders = async () => {
    const res = await fetch('http://localhost:3000/orders')
    const json = await res.json()
    if (!json.items || json.items.length <= 0) {
        return []
    }
    return json.items.map((o) => {
        return new Order(o.id, o.items)
    })
}

const fetchOrder = async (id) => {
    const res = await fetch(`http://localhost:3000/orders/${id}`)
    const json = await res.json()
    return json.item || {}
}

module.exports = {
    Order,
    fetchOrders,
    fetchOrder,
}
