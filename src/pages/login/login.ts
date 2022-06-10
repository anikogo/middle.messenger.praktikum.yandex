import Block from "../../utils/Block";
import template from "./index.hbs";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export class LoginPage extends Block {
  constructor() {
    super();
  }
    
  initChildren() {

    this.children.loginInput = new Input({
      pholderText: "login",
      events: {
        input: () => console.log(this.children.loginInput._element.value),
      },
      className: "input__main-input",
    });
    
    this.children.pwdInput = new Input({
      pholderText: "password",
      events: {
        input: () => console.log(this.children.pwdInput._element.value),
      },
      className: "input__main-input",
      inType: "password"
    });

      this.children.authButton = new Button({
        label: "Sign in",
        events: {
          click: () => console.log("clicked"),
        },
        className: "button__primary-button rounding",
        linkName: ""
      });
  
      this.children.regButton = new Button({
        label: "Register",
        events: {
          click: () => console.log("clicked2"),
        },
        className: "button__secondary-button rounding",
        linkName: "../register/register.ts"
      })
    };

  render() {
    return this.compile(template, {});
  };
};