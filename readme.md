<p align="center">
  <img alt="Versão" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <img alt="node-version" src="https://img.shields.io/node/v/@open-wa/wa-automate"/>
  <img alt="made-with-node" src="https://img.shields.io/badge/Made%20with-node-1f425f.svg"/>
</p>

## Installation

```bash
git clone https://github.com/becomewar/whatsapp-bot.git
```

```bash
cd whatsapp-bot
```

```bash
yarn install
```

## Environment variables

```env
MAINTENANCE_MODE=false
BASE_URL_=http://localhost:3200
```

- **MAINTENANCE_MODE:** Indicates if the bot is under maintenance, if true, it will respond with its current status and will not perform any function.
- **BASE_URL:** If not entered, it will be by default: `http://localhost:3004`

## Server

> _BASE_URL_ Configuration for group authorizations to work:

We need a file to store all the information:

```bash
touch ~/src/Server/db.json
```

Now open this file in your text editor and paste the object below:

```json
{
  "authorizations": []
}
```

### Development environment

We are using the package [json-server](https://yarnpkg.com/package/json-server) to create a fake RestApi, where we will save our database. To start it, enter the Server folder and issue the following commands:

```
cd src/Server
```

```
yarn install
```

If you are in the development environment, just run `yarn start`.

## Execution

```
yarn start
```

Scan the QR Code as if you were connecting to whatsapp web.
> Don't forget to check if multidevices (Multiple Devices) is enabled on your whatsapp.
