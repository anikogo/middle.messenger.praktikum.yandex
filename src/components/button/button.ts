import Block, {BlockProps} from "../../utils/Block";

interface ButtonProps extends BlockProps {
  label: string;
  className?: string;
  linkName?: string;
  onClick: () => void;
};

export default class Button extends Block {

  static get getCompName(){return "Button"};

  constructor(props: ButtonProps) {
    const {onClick, ...rest} = props;
    super({...rest, events: {click: onClick}});
  };

  render() {
    return /*template*/`<button class="{{ className }}">{{ label }}</button>`;
  };
};
