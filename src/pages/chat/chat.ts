import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { HTTPTransport } from "../../utils/requestAPI";
import { withStore } from "../../utils/withStore";
import { State, Store } from "../../utils/Store";

export class ChatsPage extends Block {
  constructor(props?: any) {
    super({
      ...props,
      goToSettings: () => {
        const router = new Router();
        router.go("/settings")
      },
      addNewChat: () => {
        this.dispatch({isAddChatShown: true});
      }
    });
  };

  componentDidMount(): void {
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
      .then(result => {
        if (result.status !== 200) {
          const router = new Router();
          router.go("/login");
        } else {
          this.dispatch({user: JSON.parse(result.response) })
        };
      });
  };

  public static mapStateToProps(state: State) {
    return {
      first_name: state.user.first_name,
      second_name: state.user.second_name,
    }
  }

  render() {
    return /*template*/`
      <main>
        <div class="chat-form">
          <div class="chat-menu">
            <div class="chat-menu__owner">
              {{{ CogButton onClick=goToSettings }}}
              <div>
                <div class="medium-font-18">{{ first_name }} {{ second_name}}</div>
                <div class="thin-font">Status</div>
              </div>
              {{{ AddButton onClick=addNewChat }}}
              {{{ ChatModal }}}
            </div>
            <div class="chat-menu__search-box">
              {{{ Input
                idName="searchChat"
                className="input__search-input rounding"
                pholderText="search chat..."
              }}}
            </div>
            <div class="chat-menu__list">
            </div>
          </div>
          <div class="chat-area">
            <div class="chat-area__header">
              <div class="medium-font-18">Sergey Sergeev</div>
              <div class="thin-font">last seen recently</div>
            </div>
            <div class="chat-area__content">
            {{{ Message
              className="message message__incoming-message"
              textContent="Hello bro!"
            }}}
            {{{ Message
              className="message message__outgoing-message"
              textContent="Heeeeeeeeeeeey"
            }}}
            </div>
            <div class="chat-area__footer">
              {{{ TextArea className="input__message-input left-rounding" pholderText="Message" focus="autofocus" }}}
              {{{ Button idName="sendButton" className="button__send-message right-rounding" label="^" }}}
            </div>
          </div>
        </div>
      </main>
    `;
  };
};

export default withStore(ChatsPage);
