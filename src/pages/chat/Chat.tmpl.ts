export function chatTemplate(): string {
  return /*template*/`
    <main>
      <div class="flex full-size">
        <div class="chat-menu height-max">
          <div class="chat-menu__owner-container flex">
            <div>
              {{{ IconButton
                onClick=handleButtonSettings
                Title="Settings"
                Icon="gear"
                className="chat-menu__button-settings"
              }}}
              {{{ IconButton
                onClick=handleButtonExit
                Title="Exit"
                Icon="arrow-left"
                className="chat-menu__button-logout"
              }}}
            </div>
            <div>
              <div class="medium-font-18 width-max">{{ first_name }} {{ second_name }}</div>
              <div class="thin-font"> Status </div>
            </div>
            {{{ IconButton
              onClick=handleButtonAddChat
              Title="Add new chat"
              Icon="plus"
              className="chat-menu__button-add-chat"
            }}}
            {{#if isAddChatShown}}
              {{{ ChatModal onRerender=handleRerender }}}
            {{/if}}
          </div>
          <div class="chat-menu__search-container">
            {{{ Input
              idName="searchChat"
              className="chat-menu__input-search  rounding"
              pholderText="search chat..."
            }}}
          </div>
          <div class="chat-menu__list-container">
            {{#each userChats}}
              {{{ ChatItem chatInfo=this onClick=../handleChatSelection }}}
            {{/each}}
          </div>
        </div>
        {{#if currentChatId }}
          <div class="message-area flex-column">
            <div class="message-area__header flex">
              <div class="medium-font-18">{{ currentChat.title }}</div>
              <div class="flex">
                {{{ IconButton
                  onClick=handleButtonManageUsers
                  Title="Manage users"
                  Icon="people"
                  className="chat-menu__button-add-chat"
                }}}
                {{{ IconButton
                  onClick=handleButtonDropChat
                  Title="Delete chat"
                  Icon="trash"
                  className="chat-menu__button-add-chat"
                }}}
              </div>
            </div>
            <div class="message-area__content flex-grow-1" id="messages-area">
                {{#each currentChat.messages}}
                  {{{ChatMessage message=this}}}
                {{/each}}
            </div>
            <div class="message-area__footer flex">
              {{{ TextArea
                idName="sendMessageArea"
                className="message-area__input-message left-rounding"
                pholderText="Message"
              }}}
              {{#if isManageUsersShown}}
                {{{ ManageUsersModal }}}
              {{/if}}
              {{{ Button
                idName="sendButton"
                className="message_area__button-send-message right-rounding"
                label="^"
                onClick=handleButtonSendMessage
              }}}
            </div>
          </div>
        {{/if}}
      </div>
    </main>
  `;
}
