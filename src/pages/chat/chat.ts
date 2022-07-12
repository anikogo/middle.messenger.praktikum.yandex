import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { HTTPTransport } from "../../utils/requestAPI";
import { withStore } from "../../utils/withStore";
import { State } from "../../utils/Store";
import { chatTemplate } from "./Chat.tmpl";

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
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
      .then(result => {
        if ((<XMLHttpRequest>result).status !== 200) {
          const router: Router = new Router();
          router.go("/login");
        } else {
          this.dispatch({user: JSON.parse((<XMLHttpRequest>result).response) });
          this.getChats();
        };
      });
  };

  logOut(){
    const httptransport = new HTTPTransport();
    httptransport.post("https://ya-praktikum.tech/api/v2/auth/logout")
      .then(() => {
        const router: Router = new Router();
          router.go("/login");
      })
  }

  getChats() {
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/chats?limit=30")
      .then(result => {
        if ((<XMLHttpRequest>result).status === 200) {
          this.dispatch({userChats: JSON.parse((<XMLHttpRequest>result).response) });
        };
      });
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
      chatId: this.props.currentChat.id
    }
    console.log(data);
    const httptransport = new HTTPTransport();
    httptransport.delete("https://ya-praktikum.tech/api/v2/chats", {data});
  }

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
      currentChat: state.currentChat,
      message: state.message,
    };
  };

  render(): string {
    return chatTemplate();
  };
};

export default withStore(ChatsPage);
