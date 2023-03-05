import { create, Client } from "@open-wa/wa-automate";
import options from "./options";

async function startConnection(client: Client) {
  console.log("\x1B[01;32mBoldGreen✓ NUMBER:", await client.getHostNumber(), "\x1b[0m");
  console.log("\x1B[01;32mBoldGreen[SERVER] Servidor iniciado!\x1b[0m");

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
    return client;
  });
}
