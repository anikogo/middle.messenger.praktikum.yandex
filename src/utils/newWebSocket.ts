import chatBottomScroll from "./chatBottomScroll";
import getToken from "./getToken";

export default async function newWebSocket(chat: Record<string, any>, userId: number, dispatch: any) {
  chat.token = await getToken(chat.id);
  chat.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${chat.token}`);
  chat.messages = [];

  chat.socket.addEventListener('open', () => {
    chat.socket.send(
      JSON.stringify({
        content: "0",
        type: "get old"
      })
    );

    setInterval(() => {
      chat.socket.send(
        JSON.stringify({
          type: "ping"
        })
      );
    }, 10000);

  });

  chat.socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      for (let message of data) {
        message.isOwn = message.user_id === userId;
        chat.messages.unshift(message);
      }
      dispatch();
    }

    if (data.type === "message") {
      data.isOwn = data.user_id === userId;
      chat.messages.push(data);
      dispatch();
    };

    chatBottomScroll();
  });

};
