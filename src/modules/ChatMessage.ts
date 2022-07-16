import Block, {BlockProps} from "../utils/Block";

interface MessageProps extends BlockProps {
  message: any;
};

export default class ChatMessage extends Block {

  static get getCompName(){return "ChatMessage"};

  constructor(props: MessageProps) {
    // date = getMessageDate();
    super({...props});
  };

  render() {
    return /*template*/`
      <div class="message-box">
        <div class="message-box__message {{#if message.isOwn}} message-box__message_outgoing {{else}} message-box__message_incoming {{/if}} rounding">
          <div>
            {{ message.content }}
          </div>
          <div class="message-box__message_footer"> {{ message.time }}</div>
        </div>
      </div>`;
  };
};
