import Block, { BlockProps } from "../utils/Block";
import { withStore } from "../utils/withStore";
import { HTTPTransport } from "../api/requestAPI"
import { State } from "../utils/Store";
import newWebSocket from "../utils/newWebSocket";
import { addUsersToChat } from "../api/chatAPI";
import { getUrlManageChats, getUrlUsersSearch } from "../api/requestUrlAPI";

interface ModalProps extends BlockProps {
  className?: string;
  onRerender?: () => void;
};

export class ChatModal extends Block {

  static get getCompName(){return "ChatModal"};

  constructor(props: ModalProps) {
    super({
      ...props,
      handleButtonCloseModal: () => this.closeModalWindow(),
      handleButtonSearchUsers: () => this.searchUsers(),
      handleButtonNewChat: () => this.createNewChat()
    });
  };

  closeModalWindow() {
    this.dispatch(
      {
        isAddChatShown: false,
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

    httptransport.post(getUrlManageChats, {data})
    .then((result: any) => {
      let chat: any = {};
      try {
        chat = JSON.parse(result.response);
      } catch (error) {
        throw new Error("Ошибка создания чата")
      }

      addUsersToChat(chat.id, this.props.searchUserSelected)
      this.getChats(chat.id)
      this.closeModalWindow()
    });
  };

  async getChats(chatId: number) {
    const httptransport = new HTTPTransport();
    const result: XMLHttpRequest = await httptransport.get(getUrlManageChats);


    if (result.status === 200) {
      let chats: any = {};
      try {
        chats = JSON.parse(result.response);
      } catch (error) {
        throw new Error("Проблема доступа к чатам")
      }
      const chat = chats.find(c => c.id === chatId);

      await newWebSocket(chat, this.props.userId,  () => {
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
      httptransport.post(getUrlUsersSearch, {data})
        .then(result => {
          let searchUserList: any = {};
          try {
            searchUserList = JSON.parse(result.response)
          } catch (error) {
            throw new Error("невозможно получить список пользователей")
          }
          this.dispatch({searchUserList: searchUserList});
        })
    } else {
      this.dispatch({searchUserList: ""});
    }
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
      <div class="add-chat-modal rounding" id="add-chat-modal">
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
