import Block, { BlockProps } from "../utils/Block";
import { withStore } from "../utils/withStore";
import { HTTPTransport } from "../utils/requestAPI"
import { State } from "../utils/Store";

interface ModalProps extends BlockProps {
  className?: string;
  onBlur?: () => void;
  onCloseClick?: () => void;
};

export class ChatModal extends Block {

  static get getCompName(){return "ChatModal"};

  constructor(props: ModalProps) {
    const {onBlur, ...rest} = props;
    super({
      ...rest,
      events: {blur: onBlur},
      handleButtonCloseModal: () => this.closeModalWindow(),
      handleButtonSearchUsers: () => this.searchUsers(),
      handleButtonNewChat: () => this.createNewChat()
    });
  };

  closeModalWindow() {
    this.dispatch(
      {
        isAddChatShown: () => {return false},
        inputChatName: "",
        searchUserList: [],
        searchUserName: "",
        searchUserSelected: [],
      }
    )
  }

  createNewChat() {
    const httptransport = new HTTPTransport();
    const inputElvalue: string = document.getElementById("inputChatName")?.value;
    this.dispatch({ inputChatName: () => {return inputElvalue}})
    const data: Record<string, any> = {title: inputElvalue};

    httptransport.post("https://ya-praktikum.tech/api/v2/chats", {data})
    .then((result: any) => {
      const chat = JSON.parse(result.response);
      this.addUsersToChat(chat.id)
      this.getChatList();
    })
  }

  getChatList() {
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/chats")
      .then((result: any) => {
        this.dispatch({chatList: JSON.parse(result.response)});
      })
  }

  searchUsers() {
    const httptransport = new HTTPTransport();
    const inputNamevalue = document.getElementById("searchUserName")?.value;
    const inputChatvalue: string = document.getElementById("inputChatName")?.value;
    this.dispatch(
      { searchUserName: () => {return inputNamevalue},
        inputChatName: () => {return inputChatvalue},
      }
    )
    const data: Record<string, any> = {login: inputNamevalue};

    if (data.login) {
      httptransport.post("https://ya-praktikum.tech/api/v2/user/search", {data})
      .then(result => {
        this.dispatch({searchUserList: JSON.parse(result.response)});
      })
    } else {
      this.dispatch({searchUserList: ""});
    }
  }

  addUsersToChat(chatId: any) {
    const httptransport = new HTTPTransport();
    const data = {
      users: window.store.state.searchUserSelected,
      chatId: chatId,
    }
    console.log(data)
    httptransport.put("https://ya-praktikum.tech/api/v2/chats/users", {data})
  }

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      isAddChatShown: state.isAddChatShown,
      searchUserName: state.searchUserName,
      searchUserList: state.searchUserList,
      searchUserSelected: state.searchUserSelected,
      chatList: state.chatList,
      inputChatName: state.inputChatName,
    }
  }

  render() {
    return /*template*/`
      <div class="add-chat-modal rounding {{#unless isAddChatShown}} hidden {{/unless}}" id="add-chat-modal">
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
          <div >Add new chat</div>
          {{{ CloseButton onClick = handleButtonCloseModal }}}
        </div>
        <div>
          {{{ Input
            idName="inputChatName"
            className="input__search-input rounding"
            pholderText="Enter chat name"
            value=inputChatName
          }}}
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
          {{{ Input
            idName="searchUserName"
            className="input__search-input left-rounding"
            value=searchUserName
            pholderText="Search users by login"
          }}}
          {{{ Button label="search" onClick=handleButtonSearchUsers className="right-rounding"}}}
        </div>
        {{#each searchUserSelected }}
          {{ this.first_name}}
        {{/each}}
        {{{ UserList }}}
        {{{ Button label="Create chat" onClick=handleButtonNewChat}}}
      </div>
    `;
  };
};

export default withStore(ChatModal);
