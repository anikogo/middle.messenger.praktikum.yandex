import Block, {BlockProps} from "../utils/Block";
import octicons from "@primer/octicons";

interface ButtonProps extends BlockProps {
  onClick: () => void;
  Title: string;
  Icon: string;
  className: string
};

export default class IconButton extends Block {

  static get getCompName(){return "IconButton"};

  constructor(props: ButtonProps) {
    const {onClick, ...rest} = props;
    super({
      ...rest,
      events: {click: onClick}
    });
  };

  render() {
    return /*template*/`
      <div class="{{ className }}" title="{{ Title }}">
        ${octicons[this.props.Icon].toSVG()}
      </div>`;
  };
};
