import Block, {BlockProps} from "../utils/Block";

interface ButtonProps extends BlockProps {
  onClick?: () => void;
  className?: string;
  divContent?: () => void;
};

export default class DivButton extends Block {

  static get getCompName(){return "DivButton"};

  constructor(props: ButtonProps) {
    const {onClick, ...rest} = props;
    super({...rest, events: {click: onClick}});
  };

  render() {
    return /*template*/`<div class="{{ className }}">{{ divContent }}</div>`;
  };
};
