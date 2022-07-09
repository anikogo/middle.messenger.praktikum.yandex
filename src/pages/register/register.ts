import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { validate, submitAllFields } from "../../utils/validate";
import { HTTPTransport } from "../../utils/requestAPI";
import { registerTemplate } from "./Register.tmpl";

export default class RegisterPage extends Block {
  private loginInput: string = "";
  private passwordInput: string = "";
  private firstNameInput: string = "";
  private secondNameInput: string = "";
  private phoneInput: string = "";
  private emailInput: string = "";
  private passwordRetypeInput: string = "";
  private isConfirmed: boolean = true;

  constructor(props?: any) {
    super({...props,
      checkLoginEvent: (e: Event): void => this.checkFileld("login", this.loginInput, e.target?.id),
      checkPwdEvent: (e: Event): void => this.checkFileld("password", this.passwordInput, e.target?.id),
      checkFirstNameInput: (e: Event): void => this.checkFileld("name", this.firstNameInput, e.target?.id),
      checkSecondNameInput: (e: Event): void => this.checkFileld("name", this.secondNameInput, e.target?.id),
      checkRetypePwdEvent: (e: Event): void => this.checkFileld("password", this.passwordRetypeInput, e.target?.id),
      checkPhoneEvent: (e: Event): void => this.checkFileld("phone", this.phoneInput, e.target?.id),
      checkEmailEvent: (e: Event): void => this.checkFileld("email", this.emailInput, e.target?.id),
      handleLoginInput: (e: InputEvent): void => { this.loginInput = e.target?.value },
      handlePasswordInput: (e: InputEvent): void => { this.passwordInput = e.target?.value },
      handleRetypePasswordInput: (e: InputEvent): void => { this.passwordRetypeInput = e.target?.value },
      handleFirstNameInput: (e: InputEvent): void => { this.firstNameInput = e.target?.value },
      handleSecondtNameInput: (e: InputEvent): void => { this.secondNameInput = e.target?.value },
      handlePhoneInput: (e: InputEvent): void => { this.phoneInput = e.target?.value },
      handleSecondNameInput: (e: InputEvent): void => { this.secondNameInput = e.target?.value },
      handleEmailInput: (e: InputEvent): void => { this.emailInput = e.target?.value },

      handleSubmit: () => {
        this.isConfirmed = true;
        submitAllFields(this.element?.querySelectorAll(".js-input-validation"));

        if (!this.isConfirmed) return;

        const httptransport = new HTTPTransport();
        const data = {
          first_name: this.firstNameInput,
          second_name: this.secondNameInput,
          login: this.loginInput,
          email: this.emailInput,
          password: this.passwordInput,
          phone: this.phoneInput,
        };

        httptransport.post("https://ya-praktikum.tech/api/v2/auth/signup", {data});
      },

      goToLogin: () => {
        const router = new Router();
        router.go("/login");
      },
    });
  };

  checkFileld(type: string, value: string, id: string ): void {
    if (!validate(type, value, id)) {
      this.isConfirmed = false;
    };
  };

  render(): string {
    return registerTemplate();
  };
};
