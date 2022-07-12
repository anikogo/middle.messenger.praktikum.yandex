import Block, {BlockProps} from "../utils/Block";

interface InputProps extends BlockProps {
  name?: string;
  pholderText?: string;
  className?: string;
  inType?: string;
  idName?: string;
  value?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
};

export default class Input extends Block {

  static get getCompName(){return "Input"};

  constructor(props: InputProps) {
    props.inType = props.inType || "text";
    props.value = props.value || "";
    const {onBlur, onFocus, onInput, ...rest} = props;
    super({
      ...rest,
      events: {blur: onBlur, focus: onFocus, input: onInput}
    });
  };

  render() {
    return /*template*/`
      <input id="{{ idName }}" name="{{ name }}" class="{{ className }}" placeholder="{{ pholderText }}" type="{{ inType }}" value="{{ value }}" />
    `;
  };
};
