## Overview

This project doesn't include pack broker, please start your broker before running this.

Please visit [this](https://github.com/pact-foundation/pact_broker#usage) to see how setup broker or you can go to [docker version](https://github.com/pact-foundation/pact-broker-docker)

## Usage
To test consumer, and recommend run this command before test provider because we need contracts
### Consumer
```
$ npm run test:consumer
$ yarn test:consumer
```
### Provider
```
$ npm run test:provider
$ yarn test:provider
```