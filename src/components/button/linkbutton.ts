import Block from "../../utils/Block";

interface ButtonProps {
  label: string;
  className?: string;
  linkName?: string;
  onClick?: () => void;
}

export default class LinkButton extends Block {
  constructor({...props}) {
    if (!props.events) {
      props.events = {};
    }
    props.events.click = props.onClick;
    super(props);
  }

  render() {
    return `<a href="{{ linkName }}" class="{{ className }}">{{ label }}</a>`;
  }
};