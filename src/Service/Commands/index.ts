import { CommandTypes } from "./types";

import { Authorize, Menu, MyNumber, Readme, Revoke, Sticker, WarnEveryone } from "../../Modules";

export const Commands: CommandTypes = {
  s: Sticker,
  readme: Readme,
  menu: Menu,
  mynumber: MyNumber,
  warnall: WarnEveryone,
  authorize: Authorize,
  revoke: Revoke,
};
