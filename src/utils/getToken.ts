import { getUrlTokenRequest } from "../api/requestUrlAPI";
import { HTTPTransport } from "../api/requestAPI";

export default async function getToken(chatId: number) {
  const httptransport = new HTTPTransport();
  const requestURL = getUrlTokenRequest(chatId);
  const result: XMLHttpRequest = await httptransport.post(requestURL, {});
  let token: string = "";

  try {
    token = JSON.parse(result.response).token;
  } catch (error) {
    throw new Error("Не получен токен");
  }

  return token;
}
