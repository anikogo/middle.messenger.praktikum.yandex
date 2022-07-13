import getToken from "./getToken";

export default async function newWebSocket(chat: Record<string, any>, userId: number, dispatch: any) {
  chat.token = await getToken(chat.id);
  chat.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${chat.token}`);
  chat.messages = [];

  chat.socket.addEventListener("message", event => {
    const data = JSON.parse(event.data)
    if (data.type === "message") {
      data.isOwn = data.user_id === userId;
      chat.messages.push(data);
      dispatch(chat);
    };
  });
};
