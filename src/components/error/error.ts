import Block from "../../utils/Block";


interface InputProps {
  className?: string;
  idName?: string;
}

export default class Error extends Block {
  constructor({...props}) {
    super(props);
  }

  render() {
    return `<div id="{{ idName }}"name="error" class="{{ className }}" ></div>`;
  }
};