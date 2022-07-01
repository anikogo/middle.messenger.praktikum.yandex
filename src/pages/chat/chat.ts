import Block from "../../utils/Block";
import Router from "../../utils/Router";

export default class ChatsPage extends Block {
  constructor(props?: any) {
    super({props,
      goToSettings: () => {
        const router = new Router();
        router.go("/settings")
      },
    });
  };

  render() {
    return /*template*/`
      <main>
        <div class="chat-form">
          <div class="chat-menu">
            <div class="chat-menu__owner">
              {{{ CogButton onClick=goToSettings }}}
              <div>
                <div class="medium-font-18">Artyom Niko</div>
                <div class="thin-font">Status</div>
              </div>
            </div>
            {{{ Input
              idName="searchChat"
              className="input__search-input rounding"
              pholderText="search chat..."
            }}}
            <div class="chat-menu__list">
              {{{ ChatItem userName="Sergey Sergeev" }}}
              {{{ ChatItem userName="Anton Antonov" }}}
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
