import Block, {BlockProps} from "../../utils/Block";

interface InputProps extends BlockProps {
  name: string;
  pholderText?: string;
  className?: string;
  inType?: string;
  idName?: string;
  onBlur?: () => void;
  onFocus?: () => void;
};

export default class Input extends Block {

  static get getCompName(){return "Input"};

  constructor(props: InputProps) {
    props.inType = props.inType || "text";
    const {onBlur, onFocus, ...rest} = props;
    super({...rest, events: {blur: onBlur, focus: onFocus}});
  };

  render() {
    return /*template*/`
      <input id="{{ idName }}" name="{{ name }}" class="{{ className }}" placeholder="{{ pholderText }}" type="{{ inType }}" />
    `;
  };
};
