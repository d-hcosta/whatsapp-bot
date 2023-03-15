import { Client, Message } from "@open-wa/wa-automate";
import { Authorization, Commands } from "../Service";
import { SYSTEM_MESSAGES } from "../Constants";

export async function startConfiguration(client: Client, message: Message) {
  const { id, caption, body, isGroupMsg, chat, from } = message;

  const text = caption || body || "";
  const command = text.split(/\s+/)[0].toLowerCase();

  if (!command.startsWith("!") && !command.startsWith(".")) {
    console.log("UNKNOWN COMMAND:", command);
    return;
  }

  const commandText = command.slice(1);

  if (!(commandText in Commands)) {
    console.log("UNKNOWN COMMAND:", command);
    return;
  }

  if (isGroupMsg && !(await Authorization(chat.id))) {
    if (command !== "!authorize" && command !== ".authorize") {
      console.log("\x1b[1;31mNOT AUTHORIZED! IGNORING\x1b[0m");
      return client.reply(from, SYSTEM_MESSAGES.NOT_AUTHORIZED(), id);
    }
  }

  try {
    await Commands[commandText](client, message);
  } catch (error) {
    console.log("ERROR IN MODULE:", error);
  }
}
