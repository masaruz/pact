const { server } = require('./server')
const { Verifier } = require('@pact-foundation/pact')
const { brokerUrl } = require('../../config')

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
    const port = 3000
    const opts = {
        provider: 'OrderApi',
        providerBaseUrl: `http://localhost:${port}`,
        pactBrokerUrl: brokerUrl,
        publishVerificationResult: true,
        tags: ['prod'],
        providerVersion: '1.0.' + process.env.HOSTNAME,
    }
    let runningServer;

    beforeAll(async () => {
        runningServer = server.listen(port, () => {
            console.log(`Provider service listening on http://localhost:${port}`)
        })
    })

    afterAll(() => {
        runningServer.close()
    })

    it('should validate the expectations of Order Web', () => {
        return new Verifier().verifyProvider(opts)
    })
})