import { GroupChatId } from "@open-wa/wa-automate";

type InformationsTypes = {
  id: GroupChatId;
  text: string;
};

type InformationsResponseTypes = {
  status: boolean;
  infor: Infor | null;
  error: number;
};
