import { ContactId, GroupChatId } from "@open-wa/wa-automate";
import axios from "axios";

import { AuthorizationResponseTypes, AuthorizationTypes } from "./types";

require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

export const Authorization = async (id: ContactId | GroupChatId): Promise<boolean> => {
  const { status, authorization } = await CheckAuthorization(id);
  return status ? authorization : false;
};

export async function CheckAuthorization(id: ContactId | GroupChatId): Promise<AuthorizationResponseTypes> {
  return axios
    .get<AuthorizationTypes>(`${BASE_URL}/authorizations/${id}`)
    .then((res) => {
      return {
        status: true,
        authorization: res.data.authorization,
        error: 0,
      };
    })
    .catch((err) => {
      console.log(`error: ${err}`);
      return {
        status: false,
        authorization: false,
        error: err?.response?.status || 123,
      };
    });
}

export async function UpdateAuthorization(value: boolean, id: string): Promise<boolean> {
  return axios
    .patch(`${BASE_URL}/authorizations/${id}`, {
      authorization: value,
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(`error: ${err}`);
      return false;
    });
}

export async function CreateAuthorization(
  value: boolean,
  id: string
): Promise<{
  status: boolean;
  error: number;
}> {
  return axios
    .post(`${BASE_URL}/authorizations`, {
      id: id,
      authorization: value,
    })
    .then((res) => {
      return {
        status: true,
        error: 0,
      };
    })
    .catch((err) => {
      console.log(`error: ${err}`);
      return {
        status: false,
        error: err?.response?.status,
      };
    });
}
