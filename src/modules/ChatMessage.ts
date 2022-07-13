import Block, {BlockProps} from "../utils/Block";

interface MessageProps extends BlockProps {
  message: any;
  date: string;
};

export default class ChatMessage extends Block {

  static get getCompName(){return "ChatMessage"};

  constructor(props: MessageProps) {
    let {date, ...rest} = props;
    date = getMessageDate();
    super({...rest, date});
  };

  render() {
    return /*template*/`
      <div class="message">
        <div class="{{#if message.isOwn}} message__outgoing-message {{else}} message__incoming-message {{/if}} rounding">
          <div class="message__text">
            {{ message.content }}
          </div>
          <div class="message__footer"> {{ message.time }}</div>
        </div>
      </div>`;
  };
};
