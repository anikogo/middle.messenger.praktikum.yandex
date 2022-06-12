import Block, {BlockProps} from "../../utils/Block";

interface ButtonProps extends BlockProps {
  label: string;
  className?: string;
  linkName?: string;
  onClick: () => void;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    props.events = props.events || {};
    props.events.click = props.onClick;
    super(props);
  };

  render() {
    return `<button class="{{ className }}">{{ label }}</button>`;
  };
};