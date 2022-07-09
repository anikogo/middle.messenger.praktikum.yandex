import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { submitAllFields, validate }  from "../../utils/validate";
import { HTTPTransport } from "../../utils/requestAPI";
import { loginTemplate } from "./Login.tmpl";

export default class LoginPage extends Block {

  private loginInput: string = "";
  private passwordInput: string = "";
  private isConfirmed: boolean = true;

  constructor(props?: any) {

    super({...props,
      checkLoginEvent: (e: any) => this.checkFileld("login", this.loginInput, e.target.id),
      checkPwdEvent: (e: any) => this.checkFileld("password", this.passwordInput, e.target.id),
      handleLoginInput: (e: InputEvent) => { this.loginInput = e.target?.value },
      handlePasswordInput: (e: InputEvent) => { this.passwordInput = e.target?.value },
      handleButtonSubmit: () => this.submitLogin(),
      handleButtonRegister: () => this.goToRegister(),
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

  checkFileld(type: string, value: string, id: string ): void {
    if (!validate(type, value, id)) {
      this.isConfirmed = false;
    };
  };

  submitLogin () {
    this.isConfirmed = true;
    submitAllFields(this.element?.querySelectorAll(".js-input-validation"));

    if (!this.isConfirmed) return;

    const httptransport = new HTTPTransport();
    const data = {
      login: this.loginInput,
      password: this.passwordInput,
    };

    httptransport.post("https://ya-praktikum.tech/api/v2/auth/signin", {data})
      .then(result => this.loginRequest(result));
  };

  loginRequest(response: XMLHttpRequest):void {

    if (response.status === 200 ||
        response.status === 400 &&
        response.response === "{\"reason\":\"User already in system\"}"
      ) {
      const httptransport = new HTTPTransport();
      httptransport.get("https://ya-praktikum.tech/api/v2/auth/user")
        .then(result => {
          this.userIsConnected(<XMLHttpRequest>result);
        });
    };

  };

  userIsConnected(response: XMLHttpRequest) {
    window.store.currentUser = JSON.parse(response.response);
      const router = new Router();
      router.go("/chat");
  };

  goToRegister() {
    const router = new Router();
    router.go("/register");
  }

  render() {
    return loginTemplate();
  };
};
