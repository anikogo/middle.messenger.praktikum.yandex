import Block from "../../utils/Block";
import template from "./index.hbs";


export class RegisterPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {});
  };
};