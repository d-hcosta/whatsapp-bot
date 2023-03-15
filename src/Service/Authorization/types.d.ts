import { ContactId, GroupChatId } from "@open-wa/wa-automate";

interface AuthorizationTypes {
  id: ContactId | GroupChatId;
  authorization: boolean;
}

interface AuthorizationResponseTypes {
  status: boolean;
  authorization: boolean;
  error: number;
}
