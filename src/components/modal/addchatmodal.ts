import Block, {BlockProps} from "../../utils/Block";
import { withStore } from "../../utils/withStore";
import {HTTPTransport} from "../../utils/requestAPI"
import { State } from "../../utils/Store";

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
      closeModal: () => {
        this.dispatch({isAddChatShown: false})
      },
      inputSearchUsers: (e) => {
        const httptransport = new HTTPTransport();
        this.dispatch({ searchUserName: e.target.value })
        const data = {login: e.target.value};

        httptransport.post("https://ya-praktikum.tech/api/v2/user/search", {data})
          .then(result => {
            this.dispatch({searchUserList: JSON.parse(result.response)});
          })
      }
    });
  };

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      isAddChatShown: state.isAddChatShown,
      searchUserName: state.searchUserName,
      searchUserList: state.searchUserList,
      searchUserSelected: state.searchUserSelected,
    }
  }

  render() {
    return /*template*/`
      <div class="add-chat-modal rounding {{#unless isAddChatShown}} hidden {{/unless}}" id="add-chat-modal">
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
          <div >Add new chat</div>
          {{{ CloseButton onClick = closeModal }}}
        </div>
        {{{ Input onInput=inputSearchUsers idName="searchUserName" className="input__search-input rounding" value=searchUserName }}}
        {{#each searchUserSelected }}
          {{ this.first_name}}
        {{/each}}
        {{{ UserList users=searchUserList }}}
      </div>
    `;
  };
};

export default withStore(ChatModal);
