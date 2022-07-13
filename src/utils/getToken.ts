import { HTTPTransport } from "./requestAPI";

export default async function getToken(chatId: number) {
  const httptransport = new HTTPTransport();
  const result: XMLHttpRequest = await httptransport.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {});
  const token = JSON.parse(result.response).token;
  return token;
};
