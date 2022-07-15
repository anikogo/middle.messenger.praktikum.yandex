export function chatTemplate(): string {
  return /*template*/`
    <main>
      <div class="chat-form">
        <div class="chat-menu">
          <div class="chat-menu__owner">
            <div>
              {{{ IconButton
                onClick=handleButtonSettings
                Title="Settings"
                Icon="gear"
                className="chat-menu__owner-settings"
              }}}
              {{{ IconButton
                onClick=handleButtonExit
                Title="Exit"
                Icon="arrow-left"
                className="chat-menu__logout"
              }}}
            </div>
            <div>
              <div class="medium-font-18">{{ first_name }} {{ second_name }}</div>
              <div class="thin-font"> Status </div>
            </div>
            {{{ IconButton
              onClick=handleButtonAddChat
              Title="Add new chat"
              Icon="plus"
              className="chat-menu__add-chat"
            }}}
            {{{ ChatModal onRerender=handleRerender }}}
          </div>
          <div class="chat-menu__search-box">
            {{{ Input
              idName="searchChat"
              className="input__search-input rounding"
              pholderText="search chat..."
            }}}
          </div>
          <div class="chat-menu__list">
            {{#each userChats}}
              {{{ ChatItem chatInfo=this onClick=../handleChatSelection }}}
            {{/each}}
          </div>
        </div>
        {{#if currentChatId }}
          <div class="chat-area">
            <div class="chat-area__header">
              <div class="chat-area__header_status">
                <div class="medium-font-18">{{ currentChat.title }}</div>
              </div>
              <div>
                {{{ IconButton
                  onClick=handleButtonDropChat
                  Title="Delete chat"
                  Icon="trash"
                  className="chat-menu__add-chat"
                }}}
              </div>
            </div>
            <div class="chat-area__content" id="messages-area">
                {{#each currentChat.messages}}
                  {{{ChatMessage message=this}}}
                {{/each}}
            </div>
            <div class="chat-area__footer">
              {{{ TextArea
                idName="sendMessageArea"
                className="input__message-input left-rounding"
                pholderText="Message"
              }}}
              {{{ Button
                idName="sendButton"
                className="button__send-message right-rounding"
                label="^"
                onClick=handleButtonSendMessage
              }}}
            </div>
          </div>
        {{/if}}
      </div>
    </main>
  `;
};
