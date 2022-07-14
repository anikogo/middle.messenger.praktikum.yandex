import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { HTTPTransport } from "../../utils/requestAPI";
import { withStore } from "../../utils/withStore";
import { State } from "../../utils/Store";
import { chatTemplate } from "./Chat.tmpl";
import goToPage from "../../utils/goToPage";
import newWebSocket from "../../utils/newWebSocket";
import chatBottomScroll from "../../utils/chatBottomScroll";

export class ChatsPage extends Block {
  constructor(props?: any) {
    super({
      ...props,
      handleButtonSettings: (): void => this.routeToSettings(),
      handleButtonAddChat: (): any => this.dispatch({isAddChatShown: true}),
      handleButtonDropChat: () => this.dropChat(),
      handleChatSelection: (chat: any): void => this.chatSelection(chat),
      handleButtonSendMessage: (): void => this.sendMessage(),
      handleButtonExit: (): void => this.logOut(),
    });
  };

  componentDidMount(): void {
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
      .then(result => {
        if ((<XMLHttpRequest>result).status !== 200) {
          goToPage("/login");
        } else {
          this.dispatch({user: JSON.parse((<XMLHttpRequest>result).response)});
          this.getChats();
        };
      });
  };

  logOut(){
    const httptransport = new HTTPTransport();
    httptransport.post("https://ya-praktikum.tech/api/v2/auth/logout")
      .then(() => {
        goToPage("/login");
      })
  }

  async getChats() {
    const httptransport = new HTTPTransport();
    const result: XMLHttpRequest = await httptransport.get("https://ya-praktikum.tech/api/v2/chats?limit=30");
    const chats = JSON.parse(result.response);

    if (result.status === 200) {
      for (let chat of chats) {
        newWebSocket(chat, this.props.userId, () => {
          this.dispatch({ userChats: [...this.props.userChats]})
        });
      };
      this.dispatch({userChats: chats});
    };

  };

  sendMessage() {
    const textbox: HTMLTextAreaElement = document.getElementById("sendMessageArea");

    if (!textbox.value) return;

    const currentChat = this.props.userChats.find((chat: any) => chat.id === this.props.currentChatId);
    currentChat.socket.send(
      JSON.stringify({
        content: textbox.value,
        type: "message"
      })
    );

    textbox.value = "";
  };

  chatSelection(chatInfo: Record<string, any>): void {
    this.dispatch({currentChatId: chatInfo.id});
    this.dispatch({currentChat: this.props.userChats.find((chat: any) => chat.id === chatInfo.id) });
    chatBottomScroll();
  };

  async dropChat() {
    const data = {
      chatId: this.props.currentChatId,
    }
    const httptransport = new HTTPTransport();
    const result: XMLHttpRequest = await httptransport.delete("https://ya-praktikum.tech/api/v2/chats", {data})

    if (result.status === 200) {
      this.dispatch({currentChatId: null});
      this.getChats();
    };

  };

  routeToSettings(): void {
    const router: Router = new Router();
    router.go("/settings");
  };

  public static mapStateToProps(state: State): Record<string, any> {
    return {
      first_name: ():string => state.user.first_name,
      second_name: (): string => state.user.second_name,
      isAddChatShown: (): boolean => state.isAddChatShown,
      userChats: state.userChats,
      userId: state.user.id,
      currentChatId: state.currentChatId,
      // messageCount: state.userChats.find((chat: any) => chat.id === state.currentChatId) ? state.userChats.find((chat: any) => chat.id === state.currentChatId).messages?.length : 0,
    };
  };

  render(): string {
    return chatTemplate();
  };
};

export default withStore(ChatsPage);
