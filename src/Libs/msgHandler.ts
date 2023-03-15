import { Client, Message } from "@open-wa/wa-automate";
import { BANNED_USERS, SILENCED_USERS, USER_RETURN_MESSAGES } from "../Constants";
import { startConfiguration } from "../Config/start";

const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

export async function msgHandler(client: Client, message: Message) {
  try {
    const { body, from, sender, isGroupMsg, chat, caption, isMedia, mimetype } = message;
    const { formattedTitle } = chat;

    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;

    const commands = caption || body || "";
    const command = commands.toLowerCase().split(" ")[0] || "";
    const args = commands.split(" ");
    const isCommand = commands.startsWith("!") || commands.startsWith(".");

    if (SILENCED_USERS.includes(chat.id)) {
      return;
    }

    console.log("---------------------------------------");
    console.log("DATE TIME: ", new Date().toLocaleString("pt-br"));
    isGroupMsg ? console.log("FROM: ", pushname, "IN", formattedTitle) : console.log("FROM: ", pushname);
    console.log("FROM_ID: ", chat.id);
    console.log("ARGUMENTS: ", isMedia ? `[${mimetype}]` : args);
    console.log("BODY: ", isMedia ? `[${mimetype}]` : body);
    console.log("COMMAND: ", command);

    if (isCommand && BANNED_USERS.includes(chat.id)) {
      console.log("\x1b[1;31mBANNED USER! IGNORING\x1b[0m");
      await client.sendText(from, USER_RETURN_MESSAGES.youAreBanned());
      return;
    }

    if (isCommand && isMaintenanceMode) {
      console.log("\x1b[1;31mMAINTENANCE_MODE ON! IGNORING\x1b[0m");
      return client.sendText(from, USER_RETURN_MESSAGES.imInMaintenance());
    }

    startConfiguration(client, message);
  } catch (err) {
    console.log("\x1b[1;31m[ERROR]\x1b[0m", err);
  }
}
