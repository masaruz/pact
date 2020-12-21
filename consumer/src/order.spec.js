const { Pact, Matchers } = require("@pact-foundation/pact")
const path = require("path")
const { fetchOrders, fetchOrder } = require('./Order')

const { eachLike, like, term, iso8601DateTimeWithMillis } = Matchers

// Setup Pact
const provider = new Pact({
    port: 3000,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    consumer: "OrderWeb",
    provider: "OrderApi"
});

const createInteraction = (state, desc, path, method, body, status) => ({
    state,
    uponReceiving: desc,
    withRequest: {
        path,
        method,
    },
    willRespondWith: {
        body,
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
})

describe('Pact with Order API', () => {
    beforeAll(async () => {
        // Start the mock service!
        await provider.setup()
    })

    afterAll(async () => {
        await provider.finalize()
    })

    describe('given there are orders', () => {
        describe('when a call to the API is made', () => {
            it('will receive the list of current orders', async () => {
                await provider.addInteraction(createInteraction(
                    'there are orders',
                    'a request for orders',
                    '/orders',
                    'GET',
                    {
                        items: [
                            like({
                                id: 1,
                                name: 'burger',
                                quantity: 2,
                                value: 20,
                            }),
                            like({
                                id: 2,
                                name: 'coke',
                                quantity: 2,
                                value: 5,
                            }),
                        ],
                    },
                    200,
                ))
                const orders = await fetchOrders()
                expect(orders.length).toBe(2)
            })

            it('will receive the list of current orders', async () => {
                await provider.addInteraction(createInteraction(
                    'there is an order',
                    'a request for an order',
                    '/orders/1',
                    'GET',
                    {
                        id: like(1),
                    },
                    200,
                ))
                const order = await fetchOrder(1)
                expect(order).toEqual({})
            })
        })
    })
})