import Block from "../../utils/Block";

interface ButtonProps {
  label: string;
  className?: string;
  linkName?: string;
  onClick?: () => void;
}

export default class Button extends Block {
  constructor({...props}) {
    if (!props.events) {
      props.events = {};
    }
    props.events.click = props.onClick;
    super(props);
  }

  render() {
    return `<button class="{{ className }}">{{ label }}</button>`;
  }
};