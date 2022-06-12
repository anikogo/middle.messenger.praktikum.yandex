import Block from "../../utils/Block";

export default class ChatsPage extends Block {
  constructor() {
    super();
  }
 
  render() {
    return `
            <main>
            <div class="chat-form">
                <div class="chat-menu">
                    <div class="chat-menu__owner">
                        <div><a class="chat-menu__owner-settings" href="#settings"><svg viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>cog-line</title>
                        <path class="clr-i-outline clr-i-outline-path-1" d="M18.1,11c-3.9,0-7,3.1-7,7s3.1,7,7,7c3.9,0,7-3.1,7-7S22,11,18.1,11z M18.1,23c-2.8,0-5-2.2-5-5s2.2-5,5-5c2.8,0,5,2.2,5,5S20.9,23,18.1,23z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M32.8,14.7L30,13.8l-0.6-1.5l1.4-2.6c0.3-0.6,0.2-1.4-0.3-1.9l-2.4-2.4c-0.5-0.5-1.3-0.6-1.9-0.3l-2.6,1.4l-1.5-0.6l-0.9-2.8C21,2.5,20.4,2,19.7,2h-3.4c-0.7,0-1.3,0.5-1.4,1.2L14,6c-0.6,0.1-1.1,0.3-1.6,0.6L9.8,5.2C9.2,4.9,8.4,5,7.9,5.5L5.5,7.9C5,8.4,4.9,9.2,5.2,9.8l1.3,2.5c-0.2,0.5-0.4,1.1-0.6,1.6l-2.8,0.9C2.5,15,2,15.6,2,16.3v3.4c0,0.7,0.5,1.3,1.2,1.5L6,22.1l0.6,1.5l-1.4,2.6c-0.3,0.6-0.2,1.4,0.3,1.9l2.4,2.4c0.5,0.5,1.3,0.6,1.9,0.3l2.6-1.4l1.5,0.6l0.9,2.9c0.2,0.6,0.8,1.1,1.5,1.1h3.4c0.7,0,1.3-0.5,1.5-1.1l0.9-2.9l1.5-0.6l2.6,1.4c0.6,0.3,1.4,0.2,1.9-0.3l2.4-2.4c0.5-0.5,0.6-1.3,0.3-1.9l-1.4-2.6l0.6-1.5l2.9-0.9c0.6-0.2,1.1-0.8,1.1-1.5v-3.4C34,15.6,33.5,14.9,32.8,14.7z M32,19.4l-3.6,1.1L28.3,21c-0.3,0.7-0.6,1.4-0.9,2.1l-0.3,0.5l1.8,3.3l-2,2l-3.3-1.8l-0.5,0.3c-0.7,0.4-1.4,0.7-2.1,0.9l-0.5,0.1L19.4,32h-2.8l-1.1-3.6L15,28.3c-0.7-0.3-1.4-0.6-2.1-0.9l-0.5-0.3l-3.3,1.8l-2-2l1.8-3.3l-0.3-0.5c-0.4-0.7-0.7-1.4-0.9-2.1l-0.1-0.5L4,19.4v-2.8l3.4-1l0.2-0.5c0.2-0.8,0.5-1.5,0.9-2.2l0.3-0.5L7.1,9.1l2-2l3.2,1.8l0.5-0.3c0.7-0.4,1.4-0.7,2.2-0.9l0.5-0.2L16.6,4h2.8l1.1,3.5L21,7.7c0.7,0.2,1.4,0.5,2.1,0.9l0.5,0.3l3.3-1.8l2,2l-1.8,3.3l0.3,0.5c0.4,0.7,0.7,1.4,0.9,2.1l0.1,0.5l3.6,1.1V19.4z"></path>
                        <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                    </svg></a></div>
                        <div>
                            <div class="medium-font-18">Artyom Niko</div>
                            <div class="thin-font">Status</div>
                        </div>
                    </div>
                    {{{ Input idName="searchChat" className="input__search-input" pholderText="search chat..." }}}
                    <div class="chat-menu__list">
                            <div class="chat-item">
                                <div class="chat-item__picture rounding"></div>
                                {{{ ChatItem
                                    className="chat-item__text"
                                    className_user="chat-item__text_ellipsis medium-font"
                                    className_preview="chat-item__text_ellipsis thin-font"
                                    text_user="Sergey Sergeev"
                                }}}
                                <div class="chat-item__msgcounter rounding">1</div>
                            </div>
                            <div class="chat-item">
                            <div class="chat-item__picture rounding"></div>
                            {{{ ChatItem
                                className="chat-item__text"
                                className_user="chat-item__text_ellipsis medium-font"
                                className_preview="chat-item__text_ellipsis thin-font"
                                text_user="Anton Antonov"
                            }}}
                            <div class="chat-item__msgcounter rounding">1</div>
                        </div>
                    </div>
                </div>
                <div class="chat-area">
                    <div class="chat-area__header">
                        <div class="medium-font-18">Sergey Sergeev</div>
                        <div class="thin-font">last seen recently</div>
                    </div>
                    <div class="chat-area__content"></div>
                    <div class="chat-area__footer">
                        {{{ TextArea className="input__message-input left-rounding" pholderText="Message" focus="autofocus"}}}
                        {{{ Button idName="sendButton" className="button__send-message right-rounding" label="^" disabled="disabled"}}}
                    </div>
                </div>
            </div>
        </main>
        `;
  };
};