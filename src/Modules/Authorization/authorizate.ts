import { Client, Message } from "@open-wa/wa-automate";
import { CheckAuthorization, CreateAuthorization, UpdateAuthorization } from "../../Service";
import { MODULES_MESSAGES } from "../../Constants";

export async function Authorize(client: Client, message: Message) {
  const { id, from, sender, isGroupMsg, chat } = message;

  if (!isGroupMsg) {
    return client.reply(from, MODULES_MESSAGES.ERROR_ONLY_GROUPS, id);
  }

  const groupId = chat.groupMetadata.id;
  const groupAdmins = await client.getGroupAdmins(groupId);
  const isGroupAdmin = groupAdmins.includes(sender.id);

  if (!isGroupAdmin) {
    return client.reply(from, MODULES_MESSAGES.ERROR_ONLY_ADMIN, id);
  }

  const authorizationStatus = await CheckAuthorization(chat.id);

  if (authorizationStatus.status) {
    const authorization = authorizationStatus.authorization;

    if (authorization !== true) {
      const updateAuthorization = await UpdateAuthorization(true, chat.id);

      if (updateAuthorization) {
        await client.sendText(from, MODULES_MESSAGES.SUCCESS_AUTHORIZATION);
      } else {
        await client.sendText(from, MODULES_MESSAGES.ERROR_AUTHORIZATION);
      }
    } else {
      await client.sendText(from, MODULES_MESSAGES.ERROR_ALREADY_AUTHORIZED);
    }
  } else {
    if (authorizationStatus.error === 404) {
      const createAuthorization = await CreateAuthorization(true, chat.id);

      if (createAuthorization.status) {
        await client.sendText(from, MODULES_MESSAGES.SUCCESS_AUTHORIZATION);
      } else {
        const errorMessage = `${MODULES_MESSAGES.SUCCESS_AUTHORIZATION}\n${createAuthorization.error}`;
        await client.sendText(from, errorMessage);
      }
    } else {
      const errorMessage = `${MODULES_MESSAGES.SUCCESS_AUTHORIZATION}\n${authorizationStatus.error}`;
      await client.sendText(from, errorMessage);
    }
  }
}
