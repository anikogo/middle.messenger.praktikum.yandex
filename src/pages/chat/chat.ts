import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { HTTPTransport } from "../../utils/requestAPI";
import { withStore } from "../../utils/withStore";
import { State } from "../../utils/Store";
import { chatTemplate } from "./Chat.tmpl";
import goToPage from "../../utils/goToPage";

export class ChatsPage extends Block {
  constructor(props?: any) {
    super({
      ...props,
      handleButtonSettings: (): void => this.routeToSettings(),
      handleButtonAddChat: (): any => this.dispatch({isAddChatShown: true}),
      handleButtonDropChat: () => this.dropChat(),
      handleChatSelection: (e: Event): void => this.chatSelection(e),
      handleButtonSendMessage: (): void => this.sendMessage(),
      handleButtonExit: (): void => this.logOut(),
    });
  };

  componentDidMount(): void {
    console.log("imma mounted")
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
    const result: XMLHttpRequest = await httptransport.get("https://ya-praktikum.tech/api/v2/chats?limit=30")
    const chats = JSON.parse(result.response);
    if (result.status === 200) {

      for (let chat of chats) {
        chat.token = await this.getToken(chat.id);
      };

      this.dispatch({userChats: chats });
    };

  };

  async getToken(chatId: number) {
    const httptransport = new HTTPTransport();
    const result = await httptransport.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {});
    const token = JSON.parse(result.response).token;
    return token;
  };

  sendMessage() {
    const message = document.getElementById("sendMessageArea")?.value;
    console.log(message);
  };

  chatSelection(chatInfo: Record<string, any>): void {
    this.dispatch({currentChat: chatInfo});
  };

  dropChat(): void {
    const data = {
      chatId: this.props.currentChat.id,
    }
    const httptransport = new HTTPTransport();
    httptransport.delete("https://ya-praktikum.tech/api/v2/chats", {data});

    this.dispatch({currentChat: {}});
    this.getChats();
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
      userChats: (): any => state.userChats,
      currentChat: state.currentChat,
      message: state.message,
    };
  };

  render(): string {
    return chatTemplate();
  };
};

export default withStore(ChatsPage);
