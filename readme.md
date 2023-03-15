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
- **BASE_URL_:** If not entered, it will be by default: `http://localhost:3004`

## Server

> _BASE_URL_ Configuration for group authorizations to work:

We need a file to store all the information:

```bash
bash mkdir -p src/Server && touch ~/src/Server/db.json
```

Now open this file in your text editor and paste the object below:

```json
{
  "authorizations": []
}
```

### Development environment

If you don't have [json-server](https://yarnpkg.com/package/json-server) globally, install it.

```bash
yarn global add json-server
```

If you are in the development environment, just run `yarn server` or `yarn server:w`, if you want in watch mode.

That way, if you want to change the port, you'll find it in the `package.json` file under `scripts`, search for `server` and `server:w` and change the port that is after the `--port` flag.

## Execution

```bash
yarn start
```

Scan the QR Code as if you were connecting to whatsapp web.
> Don't forget to check if multidevices (Multiple Devices) is enabled on your whatsapp.