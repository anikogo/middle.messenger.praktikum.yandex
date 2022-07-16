import Block, { BlockProps } from "../utils/Block";
import { withStore } from "../utils/withStore";
import { HTTPTransport } from "../utils/requestAPI"
import { State } from "../utils/Store";
import newWebSocket from "../utils/newWebSocket";

interface ModalProps extends BlockProps {
  className?: string;
  onBlur?: () => void;
  onCloseClick?: () => void;
  onRerender?: () => void;
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
    const inputElvalue: string = document.getElementById("inputChatName")?.value;
    if (!inputElvalue) return;

    const httptransport = new HTTPTransport();
    this.dispatch({ inputChatName: () => {return inputElvalue}})
    const data: Record<string, any> = {title: inputElvalue};

    httptransport.post("https://ya-praktikum.tech/api/v2/chats", {data})
    .then((result: any) => {
      const chat = JSON.parse(result.response);

      this.addUsersToChat(chat.id)
      this.getChats(chat.id)
      this.closeModalWindow()
    });
  };

  async getChats(chatId: number) {
    const httptransport = new HTTPTransport();
    const result = await httptransport.get("https://ya-praktikum.tech/api/v2/chats?limit=30");


    if ((<XMLHttpRequest>result).status === 200) {
      const chats = JSON.parse(result.response);
      const chat = chats.find(c => c.id === chatId);

      await newWebSocket(chat, this.props.userId,  () => {
        console.log('pretend to rerender');
        this.props.onRerender();
      });

      this.dispatch({ userChats: [chat, ...this.props.userChats] })
    };
  };


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
          console.log(result)
          this.dispatch({searchUserList: JSON.parse(result.response)});
        })
    } else {
      this.dispatch({searchUserList: ""});
    }
  }

  addUsersToChat(chatId: any) {
    const httptransport = new HTTPTransport();
    const data = {
      users: this.props.searchUserSelected,
      chatId: chatId,
    }
    httptransport.put("https://ya-praktikum.tech/api/v2/chats/users", {data})
  }

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      isAddChatShown: state.isAddChatShown,
      searchUserName: state.searchUserName,
      searchUserList: state.searchUserList,
      searchUserSelected: state.searchUserSelected,
      userChats: state.userChats,
      userId: state.user.id,
      inputChatName: state.inputChatName,
    }
  }

  render() {
    return /*template*/`
      <div class="add-chat-modal rounding {{#unless isAddChatShown}} hidden {{/unless}}" id="add-chat-modal">
        <div class="add-chat-modal__header flex">
          <div >Add new chat</div>
          {{{ IconButton
            onClick = handleButtonCloseModal
            Icon="x"
            Title="Close"
          }}}
        </div>
        <div>
          {{{ Input
            idName="inputChatName"
            className="add-chat-modal__input-search  rounding"
            pholderText="Enter chat name"
            value=inputChatName
          }}}
        </div>
        <div class="add-chat-modal__search-container flex">
          {{{ Input
            idName="searchUserName"
            className="add-chat-modal__input-search  left-rounding"
            value=searchUserName
            pholderText="Search users by login"
          }}}
          {{{ Button
            label="search"
            onClick=handleButtonSearchUsers
            className="add-chat-modal__bottom right-rounding"
          }}}
        </div>
        {{#each searchUserSelected }}
          {{ this.first_name }}
        {{/each}}
        {{{ UserList }}}
        {{{ Button
          label="Create chat"
          onClick=handleButtonNewChat
          className="add-chat-modal__bottom width-max rounding"
        }}}
      </div>
    `;
  };
};

export default withStore(ChatModal);
