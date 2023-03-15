import { Message } from "@open-wa/wa-automate";
import { Client } from "@open-wa/wa-automate-types-only";

export async function Menu(client: Client, message: Message) {
  const { id, from, body, caption } = message;

  const commands = caption ?? body ?? "";
  const args = commands.split(" ");

  const helpMode = args[1];
  const showAll = "*See all?*\nSend _!menu_";
  const defaultHelp = `*=== BOT menu! ===*\nHi! I do a lot of things.\nChoose one of the categories:\n*# Stickers* 📄\nSend _!menu sticker_\n*# Other commands* 📚\nSend _!menu others_\n*# To groups* 📚\nSend _!menu groups_\n----------------------\n╿\n╰╼ I'm Zero, Diego's bot!`;

  await client.react(id, "👌");

  let help;

  switch (helpMode) {
    case "stickers":
    case "sticker":
      help = `*=== BOT Stickers! ===*\n→ Send a photo, gif or video and type _!s_ in the caption.\nYou can also mention the photo, gif or video by replying _!s_.\n\n${showAll}`;
      break;
    case "others":
    case "other":
      help = `*=== Other BOT commands! ===*\n→ !mynumber\n\n${showAll}`;
      break;
    case "groups":
    case "group":
      help = `*=== Commands for groups ===*\n→ !warnAll\n→ !ban @username.\n→ !authorize (allow the bot to work)\n→ !revoke (forbid the bot to work)\n→ !readme\n\n${showAll}`;
      break;
    default:
      help = defaultHelp;
      break;
  }

  await client.reply(from, help, id);
}
