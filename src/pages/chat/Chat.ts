import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { HTTPTransport } from "../../api/requestAPI";
import { withStore } from "../../utils/withStore";
import { State } from "../../utils/Store";
import { chatTemplate } from "./Chat.tmpl";
import goToPage from "../../utils/goToPage";
import newWebSocket from "../../utils/newWebSocket";
import chatBottomScroll from "../../utils/chatBottomScroll";
import { getUrlAuthUser, getUrlLogoutUser, getUrlManageChats } from "../../api/requestUrlAPI";

export class ChatsPage extends Block {
  constructor(props?: any) {
    super({
      ...props,
      handleButtonSettings: (): void => this.routeToSettings(),
      handleButtonAddChat: (): any => this.openAddChatModal(),
      handleButtonDropChat: () => this.dropChat(),
      handleButtonManageUsers: () => this.openUserManageModal(),
      handleChatSelection: (chat: any): void => this.chatSelection(chat),
      handleButtonSendMessage: (): void => this.sendMessage(),
      handleButtonExit: (): void => this.logOut(),
      handleRerender: (): void => { this.dispatchRerender() }
    });
  };

  openAddChatModal() {
    this.dispatch({
      isManageUsersShown: false,
      isAddChatShown: true,
      inputChatName: "",
      searchUserList: [],
      searchUserName: "",
      searchUserSelected: [],
    });
  };

  openUserManageModal() {
    this.dispatch({
      isManageUsersShown: true,
      isAddChatShown: false,
      searchUserList: [],
      searchUserName: "",
      searchUserSelected: [],
    });
  }

  componentDidMount(): void {
    const httptransport = new HTTPTransport();
    httptransport.get(getUrlAuthUser)
      .then(result => {
        if ((<XMLHttpRequest>result).status !== 200) {
          goToPage("/login");
        } else {
          let user: any = {}
          try {
            user = JSON.parse((<XMLHttpRequest>result).response)
          } catch (error) {
            throw new Error("Невозможно получить информацию о пользователе")
          }
          this.dispatch({user: user});
          this.getChats();
        };
      });
  };

  logOut(){
    const httptransport = new HTTPTransport();
    httptransport.post(getUrlLogoutUser)
      .then(() => {
        goToPage("/login");
      })
  }

  async getChats() {
    const httptransport = new HTTPTransport();
    const result: XMLHttpRequest = await httptransport.get(getUrlManageChats);
    let chats: any = {};

    try {
      chats = JSON.parse(result.response);
    } catch (error) {
      throw new Error("Невозможно получить список чатов")
    }

    if (result.status === 200) {
      for (let chat of chats) {
        newWebSocket(chat, this.props.userId, () => {
          this.dispatchRerender();
        });
      };
      this.dispatch({userChats: chats});
    };

  };

  sendMessage() {
    const textbox: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("sendMessageArea");

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
    chatBottomScroll();

    chatInfo.socket.send(
      JSON.stringify({
        content: "0",
        type: "get old"
      })
    );
  };

  async dropChat() {
    const isConfirmed = confirm("Удалить чат?");
    if (!isConfirmed) return;

    const data = {
      chatId: this.props.currentChatId,
    }
    const httptransport = new HTTPTransport();
    const result: XMLHttpRequest = await httptransport.delete(getUrlManageChats, {data})

    if (result.status === 200) {
      this.dispatch({currentChatId: null});
      this.getChats();
    };

    if (result.status === 403) {
      alert("Удалить чат может только его создатель")
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
      isManageUsersShown: (): boolean => state.isManageUsersShown,
      userChats: state.userChats,
      userId: state.user.id,
      currentChatId: state.currentChatId,
      currentChat: state.userChats.find((chat: Record<string, any>) => chat.id === state.currentChatId),
    };
  };

  render(): string {
    return chatTemplate();
  };
};

export default withStore(ChatsPage);
