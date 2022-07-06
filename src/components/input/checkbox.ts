import Block, {BlockProps} from "../../utils/Block";

interface CheckboxProps extends BlockProps {

};

export default class Checkbox extends Block {

  static get getCompName(){return "Checkbox"};

  constructor(props: CheckboxProps) {
    props.inType = props.inType || "text";
    const {onBlur, onFocus, onInput, ...rest} = props;
    super({...rest, events: {blur: onBlur, focus: onFocus, input: onInput}});
  };

  render() {
    return /*template*/`
      <input id="{{ idName }}" name="{{ name }}" class="{{ className }}" placeholder="{{ pholderText }}" type="{{ inType }}" />
    `;
  };
};
