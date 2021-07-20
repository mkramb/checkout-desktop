# Checkout-Desktop

> Desktop app for Checkout.com (e.g. create & manage payment links).

![App in action](screenshots/app.png 'App in action')

This is monorepo which contains multiple `packages`:

- [@checkout/main](./packages/main/README.md)
- [@checkout/renderer](./packages/renderer/README.md)

## Prerequisite

- [Node.js 14](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)
- [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)

On Mac you can just use `brew` to install dependencies using following commands:

```bash
brew install yarn
brew install nvm
```

## Install dependencies

```
nvm install
yarn install
```

## Local Development

To start locally:

```
yarn start
```

## Release Package

This will produce DMG (Mac) and NSIS (Windows) under release folder:

```
yarn build
yarn release --mac --win --x64
```

## Installation

Under `~/.checkout` create file `config.json` with following content:

```
{
    "endpoint": "https://api.sandbox.checkout.com/payment-links",
    "authorization": "<sk>"
}
```
