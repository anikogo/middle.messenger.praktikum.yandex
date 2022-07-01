import Block, {BlockProps} from "../../utils/Block";
import getMessageDate from "../../utils/getDate";

interface MessageProps extends BlockProps {
  className?: string;
  textContent: string;
  date: string;
};

export default class Message extends Block {

  static get getCompName(){return "Message"};

  constructor(props: MessageProps) {
    let {date, ...rest} = props;
    date = getMessageDate();
    super({...rest, date});
  };

  render() {
    return /*template*/`
      <div class="{{ className }} rounding"> {{ textContent }}
        <div class="message__footer"> {{ date }}</div>
      </div>`;
  };
};
