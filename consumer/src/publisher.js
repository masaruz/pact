const path = require('path')
const { Publisher } = require('@pact-foundation/pact')
const { brokerUrl } = require('../../config')

const opts = {
    pactBroker: brokerUrl,
    consumerVersion: '1.0.0',
    publishVerificationResult: true,
    pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
}
console.log("Start Pact publisher")
new Publisher(opts)
    .publishPacts()
    .then(() => {
        console.log("Pact contract publishing complete!")
    })