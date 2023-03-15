import { create, Client } from "@open-wa/wa-automate";
import { msgHandler } from "../Libs/msgHandler";
import { Options } from "./options";

async function startConnection(client: Client) {
  console.log("\x1B[01;32m[NUMBER]:", await client.getHostNumber(), "\x1b[0m");
  console.log("\x1B[01;32m[SERVER]: Server Started!\x1b[0m");

  client.onStateChanged((state) => {
    console.log("[Client status]", state);
    if (state === "CONFLICT" || state === "UNLAUNCHED") client.forceRefocus();
  });

  client.onAnyMessage(async (message) => {
    client.getAmountOfLoadedMessages().then((msg) => {
      if (msg >= 3000) {
        client.cutMsgCache();
      }
    });
    await msgHandler(client, message);
  });
  return client;
}

create(Options(true, startConnection))
  .then((client) => startConnection(client))
  .catch((error) => console.log(error));
