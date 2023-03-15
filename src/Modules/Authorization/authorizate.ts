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
  const isGroupAdmins = groupAdmins.includes(sender.id);

  if (!isGroupAdmins) {
    return client.reply(from, MODULES_MESSAGES.ERROR_ONLY_ADMIN, id);
  }

  const _checkAuthorization = await CheckAuthorization(chat.id);

  if (_checkAuthorization.status) {
    const authorization = _checkAuthorization.authorization;

    if (authorization !== true) {
      const _alterAuthorization = await UpdateAuthorization(true, chat.id);

      if (_alterAuthorization) {
        await client.sendText(from, MODULES_MESSAGES.SUCCESS_AUTHORIZATION);
      } else {
        await client.sendText(from, MODULES_MESSAGES.ERROR_AUTHORIZATION);
      }
    } else {
      await client.sendText(from, MODULES_MESSAGES.SUCCESS_AUTHORIZATION);
    }
  } else {
    if (!_checkAuthorization.status && _checkAuthorization.error === 404) {
      const _createAuthorization = await CreateAuthorization(true, chat.id);

      if (_createAuthorization.status) {
        await client.sendText(from, MODULES_MESSAGES.SUCCESS_AUTHORIZATION);
      } else {
        await client.sendText(from, `${MODULES_MESSAGES.ERROR_AUTHORIZATION}`);
      }
    } else {
      await client.sendText(from, `${MODULES_MESSAGES.ERROR_AUTHORIZATION}`);
    }
  }
}
