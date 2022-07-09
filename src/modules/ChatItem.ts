import Block, { BlockProps } from "../utils/Block";

interface ChatItemProps extends BlockProps {
  userName?: string;
};

export default class ChatItem extends Block {

  static get getCompName(){return "ChatItem"};

  constructor(props: ChatItemProps) {
    super(props);
  };

  render() {
    return /*template*/`
			<div class="chat-item rounding">
				<div class="chat-item__picture rounding"></div>
				<div class="chat-item__text">
					<div class="chat-item__text_ellipsis medium-font">{{ userName }}</div>
					<div class="chat-item__text_ellipsis thin-font">Hello my friend, I'm {{ userName }}</div>
				</div>
				<div class="chat-item__msgcounter rounding">1</div>
			</div>
    `;
  };
};
