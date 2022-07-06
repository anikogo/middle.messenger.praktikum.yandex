import Block, {BlockProps} from "../../utils/Block";
import octicons from "@primer/octicons";

interface ButtonProps extends BlockProps {
  onClick: () => void;
};

export default class CloseButton extends Block {

  static get getCompName(){return "CloseButton"};

  constructor(props: ButtonProps) {
    const {onClick} = props;
    super({events: {click: onClick}});
  };

  render() {
    return /*template*/`<div class="close-button"> ${octicons["x"].toSVG()} </div>`;
  };
};
