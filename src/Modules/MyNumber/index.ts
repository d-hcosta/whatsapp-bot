import { Client, Message } from "@open-wa/wa-automate";

export async function MyNumber(client: Client, message: Message) {
  const { id, from, sender } = message;

  let chatNumber = sender.id.split("-");
  let ddd = chatNumber[0].substring(2, 4);
  let number = chatNumber[0].substring(4, 13);

  await client.react(id, "👌");

  client.reply(from, `Your number is: *(${ddd}) ${number}*.\nWith *${ddd}* your area code.`, id);
}
