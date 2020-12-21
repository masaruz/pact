const path = require("path")
const { Publisher } = require("@pact-foundation/pact")

const opts = {
    pactBroker: 'http://localhost:8080/',
    consumerVersion: '2.0.0',
    publishVerificationResult: true,
    pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
}
console.log("Start Pact publisher")
new Publisher(opts)
    .publishPacts()
    .then(() => {
        console.log("Pact contract publishing complete!")
    })