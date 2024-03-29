import { Client, ConfigObject, NotificationLanguage } from "@open-wa/wa-automate";

export function Options(headless: boolean, startConnection: (client: Client) => Promise<Client>) {
  const options: ConfigObject = {
    blockCrashLogs: false,
    disableSpins: false,
    hostNotificationLang: NotificationLanguage.PTBR,
    logConsole: false,
    viewport: {
      width: 1920,
      height: 1200,
    },
    popup: 3012,
    multiDevice: true,
    defaultViewport: null,
    sessionId: "zero-bot",
    headless: headless,
    qrTimeout: 0,
    authTimeout: 60,
    restartOnCrash: startConnection,
    cacheEnabled: true,
    useChrome: true,
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: true,
  };
  return options;
}
