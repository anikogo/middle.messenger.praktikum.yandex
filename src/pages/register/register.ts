import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { validate, submitAllFields } from "../../utils/validate";
import { HTTPTransport } from "../../utils/requestAPI";
//{"id":12342}
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
      checkLoginEvent: (e: any) => {if (!validate("login", this.loginInput, e.target.id)) this.isConfirmed = false},
      checkPwdEvent: (e: any) => {if (!validate("password", this.passwordInput, e.target.id)) this.isConfirmed = false},
      checkFirstNameInput: (e: any) => {if (!validate("name", this.firstNameInput, e.target.id)) this.isConfirmed = false},
      checkSecondNameInput: (e: any) => {if (!validate("name", this.secondNameInput, e.target.id)) this.isConfirmed = false},
      checkRetypePwdEvent: (e: any) => {if (!validate("password", this.passwordRetypeInput, e.target.id)) this.isConfirmed = false},
      checkPhoneEvent: (e: any) => {if (!validate("phone", this.phoneInput, e.target.id)) this.isConfirmed = false},
      checkEmailEvent: (e: any) => {if (!validate("email", this.emailInput, e.target.id)) this.isConfirmed = false},

      handleLoginInput: (e: InputEvent) => {
        this.loginInput = e.target.value;
      },
      handlePasswordInput: (e: InputEvent) => {
        this.passwordInput = e.target.value;
      },
      handleRetypePasswordInput: (e: InputEvent) => {
        this.passwordRetypeInput = e.target.value;
      },
      handleFirstNameInput: (e: InputEvent) => {
        this.firstNameInput = e.target.value;
      },
      handleSecondtNameInput: (e: InputEvent) => {
        this.secondNameInput = e.target.value;
      },
      handlePhoneInput: (e: InputEvent) => {
        this.phoneInput = e.target.value;
      },
      handleSecondNameInput: (e: InputEvent) => {
        this.secondNameInput = e.target.value;
      },
      handleEmailInput: (e: InputEvent) => {
        this.emailInput = e.target.value;
      },

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

  // handleRegisterRequest(response: XMLHttpRequest):void {
  //   if (response.status === 200) {
  //     const httptransport = new HTTPTransport();
  //     httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
  //     .then(this.handleUserData);
  //   };
  // };

  // handleUserData(response: XMLHttpRequest) {
  //   console.log(JSON.parse(response.response));
  //   window.store.currentUser = JSON.parse(response.response);
  // };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Registration</h1>
          {{{ Input
            name="firstName"
            idName="firstName"
            className="input__main-input js-input-validation"
            pholderText="first name"
            onBlur=checkFirstNameInput
            onFocus=checkFirstNameInput
            onInput=handleFirstNameInput
          }}}
          {{{ Error idName="firstNameError" className="error_hidden"}}}
          {{{ Input
            name="secondName"
            idName="secondName"
            className="input__main-input js-input-validation"
            pholderText="second name"
            onBlur=checkSecondNameInput
            onFocus=checkSecondNameInput
            onInput=handleSecondNameInput
          }}}
          {{{ Error idName="secondNameError" className="error_hidden"}}}
          {{{ Input
            name="login"
            idName="login"
            className="input__main-input js-input-validation"
            pholderText="login"
            onBlur=checkLoginEvent
            onFocus=checkLoginEvent
            onInput=handleLoginInput
          }}}
          {{{ Error idName="loginError" className="error_hidden"}}}
          {{{ Input
            name="email"
            idName="email"
            className="input__main-input js-input-validation"
            pholderText="email"
            onBlur=checkEmailEvent
            onFocus=checkEmailEvent
            onInput=handleEmailInput
          }}}
          {{{ Error idName="emailError" className="error_hidden"}}}
          {{{ Input
            name="phone"
            idName="phone"
            className="input__main-input js-input-validation"
            pholderText="phone"
            onBlur=checkPhoneEvent
            onFocus=checkPhoneEvent
            onInput=handlePhoneInput
          }}}
          {{{ Error idName="phoneError" className="error_hidden"}}}
          {{{ Input
            name="password"
            idName="password"
            className="input__main-input js-input-validation"
            pholderText="password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
            onInput=handlePasswordInput
          }}}
          {{{ Error idName="passwordError" className="error_hidden"}}}
          {{{ Input
            name="rPassword"
            idName="rPassword"
            className="input__main-input js-input-validation"
            pholderText="repeat password"
            inType="password"
            onBlur=checkRetypePwdEvent
            onFocus=checkRetypePwdEvent
            onInput=handleRetypePasswordInput
          }}}
          {{{ Error idName="rPasswordError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button label="Sign in" className="button__secondary-button rounding" onClick=goToLogin }}}
            {{{ Button label="Register" className="button__primary-button rounding" onClick=handleSubmit }}}
          </div>
        </div>
      </main>
    `;
  };
};
