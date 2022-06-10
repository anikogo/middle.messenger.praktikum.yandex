import Block from "../../utils/Block";
import template from "./button.hbs"

interface ButtonProps {
  label: string;
  events?: {
    click?: () => void;
  };
  className?: string;
  linkName?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
};