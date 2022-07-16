import { HTTPTransport } from "./requestAPI";
import { getUrlManageUserToChat } from "./requestUrlAPI";

const httptransport = new HTTPTransport();

export function addUsersToChat(chatId: any, usersList: []) {
    const data: Record<string, any> = {
      users: usersList,
      chatId: chatId,
    }
    console.log(data)
    httptransport.put(getUrlManageUserToChat, {data})
}

export function removeUsersFromChat(chatId: any, usersList: []) {
  const isConfirmed: boolean = confirm("Удалить пользователя?");
  if (!isConfirmed) return;

  const data: Record<string, any> = {
    users: usersList,
    chatId: chatId,
  }
  httptransport.delete(getUrlManageUserToChat, {data})
}
