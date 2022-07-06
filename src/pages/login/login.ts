import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { submitAllFields, validate }  from "../../utils/validate";
import {HTTPTransport} from "../../utils/requestAPI";

export default class LoginPage extends Block {

  private loginInput: string = "";
  private passwordInput: string = "";
  private isConfirmed: boolean = true;

  constructor(props?: any) {

    super({...props,
      checkLoginEvent: (e: any) => {if (!validate("login", this.loginInput, e.target.id)) this.isConfirmed = false},
      checkPwdEvent: (e: any) => {if (!validate("password", this.passwordInput, e.target.id)) this.isConfirmed = false},
      handleLoginInput: (e: InputEvent) => {
        this.loginInput = e.target.value;
      },
      handlePasswordInput: (e: InputEvent) => {
        this.passwordInput = e.target.value;
      },
      handleSubmit: () => {
        this.isConfirmed = true;
        submitAllFields(this.element?.querySelectorAll(".js-input-validation"));

        if (!this.isConfirmed) return;

        const httptransport = new HTTPTransport();
        const data = {
          login: this.loginInput,
          password: this.passwordInput,
        };

        httptransport.post("https://ya-praktikum.tech/api/v2/auth/signin", {data}).then(this.handleLoginRequest);
      },
      goToRegistration: () => {
        const router = new Router();
        router.go("/register");
      },
    });
  };

  componentDidMount(): void {
    const httptransport = new HTTPTransport();
    httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
      .then(result => {
        if (result.status === 200) {
          window.store.currentUser = JSON.parse(result.response);
          const router = new Router();
          router.go("/chat");
        };
      });
  };

  handleLoginRequest(response: XMLHttpRequest):void {

    if (response.status === 200) {
      const httptransport = new HTTPTransport();
      httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
        .then(result => this.handleUserData(<XMLHttpRequest>result));
    };

    if (response.status === 400 && response.response === "{\"reason\":\"User already in system\"}") {
      const httptransport = new HTTPTransport();
      httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
        .then(result => {
          // this.handleUserData(<XMLHttpRequest>result);
          window.store.currentUser = JSON.parse(result.response);

          const router = new Router();
          router.go("/chat");

        });
    };

  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Authorization</h1>
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
            name="password"
            idName="password"
            className="input__main-input js-input-validation"
            pholderText="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
            inType="password"
            onInput=handlePasswordInput
          }}}
          {{{ Error idName="passwordError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button label="Sign in" className="button__primary-button rounding" onClick=handleSubmit }}}
            {{{ Button label="Register" className="button__secondary-button rounding" onClick=goToRegistration }}}
          </div>
        </div>
      </main>
    `;
  };
};
