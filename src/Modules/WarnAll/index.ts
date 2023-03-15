import { Client, Message } from "@open-wa/wa-automate";
import { MODULES_MESSAGES } from "./../../Constants";

export async function WarnEveryone(client: Client, message: Message) {
  const { id, from, body, sender, isGroupMsg, chat, caption, quotedMsg, quotedMsgObj } = message;

  if (!isGroupMsg) {
    return client.reply(from, MODULES_MESSAGES.ERROR_ONLY_GROUPS, id);
  }

  const groupId = chat.groupMetadata.id;
  const groupAdmins = await client.getGroupAdmins(groupId);
  const isGroupAdmin = groupAdmins.includes(sender.id);

  if (!isGroupAdmin) {
    return client.reply(from, MODULES_MESSAGES.ERROR_ONLY_ADMIN, id);
  }

  const commands = caption || body || "";
  const args = commands.split(" ");
  let alertToSend = "";

  if (quotedMsg) {
    alertToSend = quotedMsgObj?.text ?? "";
  } else {
    alertToSend = args.slice(1).join(" ") || commands.split("\n").slice(1).join("\n");
  }

  if (!alertToSend) {
    return client.reply(from, MODULES_MESSAGES.ERROR_NO_MESSAGE, id);
  }

  await client.react(id, "👌");

  const groupMembers = await client.getGroupMembers(groupId);
  const allUsersMention = groupMembers.map((member) => `@${member.id.replace(/@c.us/g, "")}`).join(" ");

  const textToSend = `*=== Warning: ===*\n${alertToSend}\n\n${allUsersMention}`;

  await client.sendTextWithMentions(from, textToSend);
}
