import Block from "../../utils/Block";
import { validate, submitAllFields } from "../../utils/validate";
import { HTTPTransport } from "../../api/requestAPI";
import { registerTemplate } from "./Register.tmpl";
import goToPage from "../../utils/goToPage";
import { getUrlRegisterUser } from "../../api/requestUrlAPI";

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
      checkLoginEvent: (e: Event): void => this.checkFileld("login", this.loginInput, (<HTMLInputElement>(e.target)).id),
      checkPwdEvent: (e: Event): void => this.checkFileld("password", this.passwordInput, (<HTMLInputElement>(e.target)).id),
      checkFirstNameInput: (e: Event): void => this.checkFileld("name", this.firstNameInput, (<HTMLInputElement>(e.target)).id),
      checkSecondNameInput: (e: Event): void => this.checkFileld("name", this.secondNameInput, (<HTMLInputElement>(e.target)).id),
      checkRetypePwdEvent: (e: Event): void => this.checkFileld("password", this.passwordRetypeInput, (<HTMLInputElement>(e.target)).id),
      checkPhoneEvent: (e: Event): void => this.checkFileld("phone", this.phoneInput, (<HTMLInputElement>(e.target)).id),
      checkEmailEvent: (e: Event): void => this.checkFileld("email", this.emailInput, (<HTMLInputElement>(e.target)).id),
      handleLoginInput: (e: InputEvent): void => { this.loginInput = (<HTMLInputElement>(e.target)).value },
      handlePasswordInput: (e: InputEvent): void => { this.passwordInput = (<HTMLInputElement>(e.target)).value },
      handleRetypePasswordInput: (e: InputEvent): void => { this.passwordRetypeInput = (<HTMLInputElement>(e.target)).value },
      handleFirstNameInput: (e: InputEvent): void => { this.firstNameInput = (<HTMLInputElement>(e.target)).value },
      handlePhoneInput: (e: InputEvent): void => { this.phoneInput = (<HTMLInputElement>(e.target)).value },
      handleSecondNameInput: (e: InputEvent): void => { this.secondNameInput = (<HTMLInputElement>(e.target)).value },
      handleEmailInput: (e: InputEvent): void => { this.emailInput = (<HTMLInputElement>(e.target)).value },
      handleButtonSubmit: () => this.registerUser(),
      handleButtonLogin: () => goToPage("/login"),
    });
  };

  checkFileld(type: string, value: string, id: string ): void {
    if (!validate(type, value, id)) {
      this.isConfirmed = false;
    };
  };

  registerUser(): void {
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

    httptransport.post(getUrlRegisterUser, {data})
      .then(() => {
        goToPage("/messenger")
      });
  }

  render(): string {
    return registerTemplate();
  };
};
