import Block from "../utils/Block";

interface InputProps {
  pholderText?: string;
  className?: string;
  idName?: string;
  value?: string;
  onInput?: () => void;
}

export default class TextArea extends Block {

  static get getCompName(){return "TextArea"}

  constructor(props: InputProps) {
    const { onInput, ...rest } = props;
    super({
      ...rest,
      events: { input: onInput }
    });
  }

  render() {
    return /*template*/`
			<textarea id="{{ idName }}" class="{{ className }}" placeholder="{{ pholderText }}" autofocus>{{ value }}</textarea>
		`;
  }
}
