const modulesRegister = require("../modules/modulesRegister");

async function start(client, message) {
    const { caption, body } = message;
    const text = caption || body || "";
    const isCommand = text.startsWith("!") || text.startsWith("/");
    
    let command = text.toLowerCase().split(" ")[0].split(" ")[0].split("\n")[0];
    let commandText;

    if (isCommand) {
        commandText = command.split("").slice(1).join("");
    }
    
    try {
        await modulesRegister[commandText](client, message);
    } catch (error) {
        console.log('Unknown command:', commandText);
    }
}
const actions = {
    start: (client, message) => start(client, message)
}

module.exports = actions;