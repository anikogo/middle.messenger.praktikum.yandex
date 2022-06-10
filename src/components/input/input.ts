import Block from "../../utils/Block";
import template from "./input.hbs"

interface InputProps {
  pholderText?: any;
  events: {
    input?: () => void;
    change?: () => void;
    blur?: () => void;
  };
  className?: string;
  inType?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
};