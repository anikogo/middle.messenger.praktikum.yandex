import { addUsersToChat, removeUsersFromChat } from "../api/chatAPI";
import { getUrlUsersSearch } from "../api/requestUrlAPI";
import Block, { BlockProps } from "../utils/Block";
import { HTTPTransport } from "../api/requestAPI";
import { State } from "../utils/Store";
import { withStore } from "../utils/withStore";

interface ModalProps extends BlockProps {
  className?: string;
  onRerender?: () => void;
};

export class ManageUsersModal extends Block {

  static get getCompName(){return "ManageUsersModal"};

  constructor(props: ModalProps) {
    super({
      ...props,
      handleButtonCloseModal: () => this.closeModalWindow(),
      handleButtonSearchUsers: () => this.searchUsers(),
      handleButtonAdd: () => this.addUser(),
      handleButtonRemove: () => this.removeUser(),
    });
  };

  searchUsers() {
    const inputNamevalue = (<HTMLInputElement>document.getElementById("manageSearchUserName")).value;
    const data: Record<string, any> = {login: inputNamevalue};


    this.dispatch({ searchUserName: () => {return inputNamevalue}});

    const httptransport = new HTTPTransport();
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

  addUser() {
    addUsersToChat(this.props.currentChatId, this.props.searchUserSelected);
    this.closeModalWindow();
  };

  removeUser() {
    removeUsersFromChat(this.props.currentChatId, this.props.searchUserSelected);
    this.closeModalWindow();
  };

  closeModalWindow() {
    this.dispatch(
      {
        isManageUsersShown: false,
        searchUserList: [],
        searchUserName: "",
        searchUserSelected: [],
      }
    )
  }

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      isManageUsersShown: state.isAddChatShown,
      searchUserName: state.searchUserName,
      searchUserList: state.searchUserList,
      searchUserSelected: state.searchUserSelected,
      inputChatName: state.inputChatName,
      currentChatId: state.currentChatId,
    }
  }

  render() {
    return /*template*/`
      <div class="manage-users-modal rounding" id="manage-users-modal">
        <div class="manage-users-modal__header flex">
          <div >Manage users</div>
          {{{ IconButton
            onClick = handleButtonCloseModal
            Icon="x"
            Title="Close"
          }}}
        </div>
        <div class="add-chat-modal__search-container flex">
          {{{ Input
            idName="manageSearchUserName"
            className="add-chat-modal__input-search left-rounding"
            value=searchUserName
            pholderText="User login"
          }}}
          {{{ Button
            label="search"
            onClick=handleButtonSearchUsers
            className="add-chat-modal__bottom right-rounding"
          }}}
        </div>
        {{{ UserList }}}
        <div class="flex">
          {{{ Button
            label="Add"
            onClick=handleButtonAdd
            className="add-chat-modal__bottom width-max left-rounding"
          }}}
          {{{ Button
            label="Remove"
            onClick=handleButtonRemove
            className="add-chat-modal__bottom width-max right-rounding"
          }}}
        </div>
      </div>
    `;
  };
};

export default withStore(ManageUsersModal);
