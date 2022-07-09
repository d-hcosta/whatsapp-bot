const { tts } = require("./tts/tts");
const { s } = require("./s/s");

const modulesRegister = {}

modulesRegister.tts = (client, message) => tts(client, message);
modulesRegister.s = (client, message) => s(client, message);

module.exports = modulesRegister;