/**
 * This file will be responsible for handling the following constants:
 * silenced and banned users and return messages to the user.
 **/

export const BANNED_USERS = [""];

export const SILENCED_USERS = [""];

export const SYSTEM_MESSAGES = {
  BANNED_USER: () => `*_You're banned._*`,
  MAITENANCE_MODE: () => `*_I'm in maitenance mode, try again later._*`,
  NOT_AUTHORIZED: () => `*I doesn't have authorization. !authorize*`,
};

export const MODULES_MESSAGES = {
  ERROR_ONLY_GROUPS: "This command can only be used on groups.",
  ERROR_ONLY_ADMIN: "Only group admins can use this command.",
  ERROR_NO_MESSAGE: "I still don't guess things... I need to know the message!",

  /* Sticker */
  ERROR_STICKER_TYPE: "I need to receive some photo or video, use *!s* in the caption.",

  /* Authorization */
  ERROR_AUTHORIZATION: "🔒 Error activating authorization!",
  ERROR_REVOKE: "🔒 Error revoking authorization!",
  ERROR_ALREADY_AUTHORIZED: "🔒 The authorization was already activated!\nUse *!revoke* to remove.",
  ERROR_ALREADY_REVOKED: "🔒 The authorization was already revoked!\nUse *!authorize* to add.",
  SUCCESS_AUTHORIZATION: "🔒 Authorization Enabled!\nTry the !menu command to see all commands.",
  SUCCESS_REVOKE: "🔒 Authorization revoked!\nYou can authorize again at any time using the command *!authorize*",
};
