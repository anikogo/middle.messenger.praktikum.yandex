import Block from "../../utils/Block";

interface InputProps {
  pholderText?: string;
  className?: string;
  autofocus?: string;
  idName?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

export default class TextArea extends Block {

  static get getCompName(){return "TextArea"};

  constructor({...props}) {
    if (!props.events) {
      props.events = {};
    };
    props.events.blur = props.onBlur;
    props.events.focus = props.onFocus;
    super(props);
  }

  render() {
    return `<textarea id="{{ idName }}" class="{{ className }}" placeholder="{{ pholderText }}" {{ focus }}></textarea>`;
  }
};