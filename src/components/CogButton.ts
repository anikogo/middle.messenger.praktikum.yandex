import Block, {BlockProps} from "../utils/Block";
//@ts-ignore
import octicons from "@primer/octicons";

interface ButtonProps extends BlockProps {
  onClick: () => void;
};

export default class CogButton extends Block {

  static get getCompName(){return "CogButton"};

  constructor(props: ButtonProps) {
    const {onClick} = props;
    super({events: {click: onClick}});
  };

  render() {
    return /*template*/`
      <div class="chat-menu__owner-settings">
        ${octicons["gear"].toSVG()}
      </div>`;
  };
};
