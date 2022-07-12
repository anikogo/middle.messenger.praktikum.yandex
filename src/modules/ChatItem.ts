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
			<div class="chat-item rounding">
				<div class="chat-item__picture rounding"></div>
				<div class="chat-item__text">
					<div class="chat-item__text_ellipsis medium-font">{{ chatInfo.title }}</div>
					<div class="chat-item__text_ellipsis thin-font">{{ chatInfo.last_message.content }}</div>
				</div>
        {{#if chatInfo.unread_count}}
				  <div class="chat-item__msgcounter rounding">{{ chatInfo.unread_count }}</div>
        {{/if}}
			</div>
    `;
  };
};
