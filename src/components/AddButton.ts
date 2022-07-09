import Block, {BlockProps} from "../utils/Block";
//@ts-ignore
import octicons from "@primer/octicons";

interface ButtonProps extends BlockProps {
  onClick: () => void;
};

export default class AddButton extends Block {

  static get getCompName(){return "AddButton"};

  constructor(props: ButtonProps) {
    const {onClick} = props;
    super({events: {click: onClick}});
  };

  render() {
    return /*template*/`
      <div class="chat-menu__add-chat">
        ${octicons["plus"].toSVG()}
      </div>`;
  };
};
