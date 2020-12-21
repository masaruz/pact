const { server } = require('./server')

server.listen(3000, () => {
    console.log(`Provider service listening on http://localhost:3000`)
})