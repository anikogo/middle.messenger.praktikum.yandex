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
    props.events = props.events || {};
    props.events.blur = props.onBlur;
    props.events.focus = props.onFocus;
    super(props);
  };

  render() {
    return /*html*/`
			<input id="{{ idName }}" name="{{ name }}" class="{{ className }}" placeholder="{{ pholderText }}" type="{{ inType }}" />
		`;
  };
};
