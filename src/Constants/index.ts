/**
 * This file will be responsible for handling the following constants:
 * silenced and banned users and return messages to the user.
 **/

export const BANNED_USERS = [""];

export const SILENCED_USERS = [""];

export const USER_RETURN_MESSAGES = {
  youAreBanned: () => `*_You're banned._*`,
  imInMaintenance: () => `*_I'm in maitenance mode, try again later._*`,
  imNotAuthorized: () => `*I doesn't have authorization. /authorize*`,
  stickerErrorType: "I need to receive some photo or video, use *!s* in the caption.",
};
