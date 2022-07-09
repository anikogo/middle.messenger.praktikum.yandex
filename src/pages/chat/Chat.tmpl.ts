export function chatTemplate(): string {
  return /*template*/`
    <main>
      <div class="chat-form">
        <div class="chat-menu">
          <div class="chat-menu__owner">
            {{{ CogButton onClick=handleButtonSettings }}}
            <div>
              <div class="medium-font-18">{{ first_name }} {{ second_name }}</div>
              <div class="thin-font">Status</div>
            </div>
            {{{ AddButton onClick=handleButtonAddChat }}}
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
          {{{ ChatMessage
            className="message message__incoming-message"
            textContent="Hello bro!"
          }}}
          {{{ ChatMessage
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
