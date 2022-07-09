const actions = require("./actions.js");
const axios = require("axios");
const { checkAuthorization } = require("./fetch");
require('dotenv').config();

const banned = [];
const ifMaintenanceModeTrue = process.env.MAINTENANCE_MODE === "true";

const allMessages = {
    userBannedTrue: () => `*_Você está banido. :)_*`,
    maintenanceModeTrue: () => `🚧️ *Estou em manutenção.* 🚧️\nVolte mais tarde!.`,
    notAuthorizedTrue: () => `*Não tenho autorização de funcionar aqui.* 😢\nUtilize *!authorizate*\n_*(Só administradores podem usar o comando).*_`,
};

async function authorization(id) {
    const _checkAuthorization = await checkAuthorization(id);

    if (_checkAuthorization.status === "success") {
        const authorization = _checkAuthorization.authorization;
        return authorization;
    } else {
        return false;
    }
}

module.exports = msgHandler = async (client, message) => {
    try {
        const { id, from, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
        const { formattedTitle } = chat;

        let { body } = message;
        let { pushname, verifiedName } = sender;
        pushname = pushname || verifiedName;

        const commands = caption || body || "";
        const words = commands.toLowerCase();
        const command = commands.toLowerCase().split(" ")[0] || "";
        const args = commands.split(" ");
        const isCommand = commands.startsWith("!") || commands.startsWith("/");

        console.log("---------------------------------------");
        console.log('Date Time:     ', new Date().toLocaleString('pt-br'));
        isGroupMsg ? console.log("From  ", pushname, "In", formattedTitle) : console.log("From:     ", pushname);
        console.log("Id:    ", chat.id);
        console.log("Args:  ", isMedia ? `[${mimetype}]` : args);
        console.log("Body:  ", isMedia ? `[${mimetype}]` : body);
        console.log("Command:   ", command);
        console.log("---------------------------------------");

        if (isCommand && banned.includes(chat.id)) {
            console.log("\x1b[1;31mBanned User! Ignoring.\x1b[0m");
            await client.sendText(from, allMessages.userBannedTrue(), id);
			return;
		}
        if (isGroupMsg && !await authorization(chat.id)) {
            if (command !== "!authorizate" && command !== "/authorizate") {
                console.log("\x1b[1;31mNot authorized! Ignoring.\x1b[0m");
                if (isCommand) {
                    return client.reply(from, allMessages.notAuthorizedTrue(), id);
                } else {
                    return;
                }
            }
        }
        if (isCommand && ifMaintenanceModeTrue) {
            console.log("\x1b[1;31mMaintenance! Ignoring.\x1b[0m");
            return client.sendText(from, allMessages.maintenanceModeTrue(), id);
        }

        actions.start(client, message);
    } catch (err) {
        console.log("\x1b[1;31m[ERROR]\x1b[0m", err);
    }
};