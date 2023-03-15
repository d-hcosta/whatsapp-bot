import { Client, Message } from "@open-wa/wa-automate";

export async function Readme(client: Client, message: Message) {
  const { id, from } = message;

  await client.react(id, "👌");

  const readme = `*=== BOT README! ===*\nI'm Zero, an open source whatsapp bot built by Diego.\n\nDo you want to see how I was made or have me on your number?\nAccess the repo there. Enjoy and give that ⭐!\nhttps://github.com/becomewar/whatsapp-bot.`;

  await client.reply(from, readme, id);
}
