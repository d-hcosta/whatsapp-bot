import { Client, Message } from "@open-wa/wa-automate";
import { decryptMedia } from "@open-wa/wa-decrypt";

import { USER_RETURN_MESSAGES } from "../../Constants";

export async function Sticker(client: Client, message: Message) {
  const { id, from, isMedia, mimetype, type, quotedMsg } = message;

  const dataConfig = {
    author: "*ZeroBot*",
    pack: "*_( ͡ʘ ͜ʖ ͡ʘ)_*",
    keepScale: true,
  };

  const uaOverride =
    "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) \
    AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

  if (isMedia && type === "image") {
    const mediaData = await decryptMedia(message, uaOverride);
    const imageBase64 = `data:${mimetype};base64,${mediaData.toString("base64")}`;

    await client.react(id, "👌");
    await client.sendImageAsSticker(from, imageBase64, dataConfig);
  } else if (quotedMsg && quotedMsg.type == "image") {
    const mediaData = await decryptMedia(quotedMsg, uaOverride);
    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString("base64")}`;

    await client.react(id, "👌");
    await client.sendImageAsSticker(from, imageBase64, dataConfig);
  } else if (
    (mimetype === "video/mp4" && ((message.duration as number) || 31) < 30) ||
    (mimetype === "image/gif" && ((message.duration as number) || 31) < 30)
  ) {
    const mediaData = await decryptMedia(message, uaOverride);

    await client.react(id, "👌");
    await client.sendMp4AsSticker(
      from,
      `data:${mimetype};base64,${mediaData.toString("base64")}`,
      undefined,
      dataConfig
    );
  } else if (
    (quotedMsg?.mimetype === "video/mp4" && ((quotedMsg?.duration as number) || 31) < 30) ||
    (quotedMsg?.mimetype === "image/gif" && ((quotedMsg?.duration as number) || 0) < 30)
  ) {
    const mediaData = await decryptMedia(quotedMsg, uaOverride);

    await client.react(id, "👌");
    await client.sendMp4AsSticker(
      from,
      `data:${quotedMsg.mimetype};base64,${mediaData.toString("base64")}`,
      undefined,
      dataConfig
    );
  } else {
    client.reply(from, USER_RETURN_MESSAGES.stickerErrorType, id);
  }
}
