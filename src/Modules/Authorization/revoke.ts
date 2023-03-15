import { Client, Message } from "@open-wa/wa-automate";
import { CheckAuthorization, UpdateAuthorization } from "../../Service";
import { MODULES_MESSAGES } from "../../Constants";

export async function Revoke(client: Client, message: Message) {
  const { id, from, sender, chat } = message;

  if (!message.isGroupMsg) {
    await client.reply(from, MODULES_MESSAGES.ERROR_ONLY_GROUPS, id);
    return;
  }

  const groupId = chat.groupMetadata.id;
  const groupAdmins = await client.getGroupAdmins(groupId);
  const isGroupAdmin = groupAdmins.includes(sender.id);

  if (!isGroupAdmin) {
    await client.reply(from, MODULES_MESSAGES.ERROR_ONLY_ADMIN, id);
    return;
  }

  const authorizationStatus = await CheckAuthorization(chat.id);

  if (authorizationStatus.status) {
    const authorization = authorizationStatus.authorization;

    if (authorization !== false) {
      const revokeStatus = await UpdateAuthorization(false, chat.id);

      if (revokeStatus) {
        await client.sendText(from, MODULES_MESSAGES.SUCCESS_REVOKE);
      } else {
        await client.sendText(from, MODULES_MESSAGES.ERROR_REVOKE);
      }
    } else {
      await client.sendText(from, MODULES_MESSAGES.ERROR_ALREADY_REVOKED);
    }
  } else if (authorizationStatus.error === 404) {
    await client.sendText(from, MODULES_MESSAGES.ERROR_ALREADY_REVOKED);
  } else {
    await client.sendText(from, `${MODULES_MESSAGES.ERROR_REVOKE}\n${authorizationStatus.error}`);
  }
}
