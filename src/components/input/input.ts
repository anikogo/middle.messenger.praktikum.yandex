import Block from "../../utils/Block";

interface InputProps {
  pholderText?: string;
  className?: string;
  inType?: string;
  idName?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

export default class Input extends Block {
  constructor({...props}) {
    if (!props.events) {
      props.events = {};
    };
    props.events.blur = props.onBlur;
    props.events.focus = props.onFocus;
    super(props);
  }

  render() {
    return `<input id="{{ idName }}" class="{{ className }}" placeholder="{{ pholderText }}" type="{{ inType }}" />`;
  }
};