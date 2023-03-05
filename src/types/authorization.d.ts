import { ContactId, GroupChatId } from "@open-wa/wa-automate";

type AuthorizationTypes = {
  id: ContactId | GroupChatId;
  authorization: boolean;
};

type AuthorizationResponseTypes = {
  status: boolean;
  authorization: boolean;
  error: number;
};
