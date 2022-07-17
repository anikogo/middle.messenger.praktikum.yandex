import Block, { BlockProps } from "../utils/Block";

interface ChatItemProps extends BlockProps {
  chatInfo?: any;
  onClick: (chatInfo: Record<string, any>) => void;
};

export default class ChatItem extends Block {

  static get getCompName(){return "ChatItem"};

  constructor(props: ChatItemProps) {
    const {onClick, ...rest} = props;
    super({
      ...rest,
      events: {
        click: () => { onClick(props.chatInfo) }
      },
    });
  };

  render() {
    return /*template*/`
			<div class="chat-menu__chat-item flex rounding">
				<div class="chat-menu__chat-item-avatar rounding"></div>
				<div class="chat-menu__chat-item-text-container">
					<div class="text_ellipsis medium-font">{{ chatInfo.title }}</div>
					<div class="text_ellipsis thin-font">{{ chatInfo.last_message.content }}</div>
				</div>
        {{#if chatInfo.unread_count}}
				  <div class="chat-menu__chat-item-message-counter rounding">{{ chatInfo.unread_count }}</div>
        {{/if}}
			</div>
    `;
  };
};
