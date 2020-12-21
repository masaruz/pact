const { Pact } = require("@pact-foundation/pact")
const path = require("path")

// Setup Pact
const provider = new Pact({
    port: 3000,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    consumer: "OrderWeb",
    provider: "OrderApi"
});

// Start the mock service!
provider.setup()