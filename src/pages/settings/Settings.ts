import Block from "../../utils/Block";
import { validate, submitAllFields } from "../../utils/validate";
import { settingsTemplate } from "./Settings.tmpl";
import goToPage from "../../utils/goToPage";
import { HTTPTransport } from "../../api/requestAPI";
import { getUrlChangeUserData } from "../../api/requestUrlAPI";

export default class SettingsPage extends Block {
  private loginInput: string = "";
  private firstNameInput: string = "";
  private secondNameInput: string = "";
  private displayNameInput: string = "";
  private phoneInput: string = "";
  private emailInput: string = "";
  private isConfirmed: boolean = true;

  constructor(props?: any) {
    super({...props,
      checkLoginEvent: (e: Event): void => this.checkFileld("login", this.loginInput, e.target?.id),
      checkFirstNameInput: (e: Event): void => this.checkFileld("name", this.firstNameInput, e.target?.id),
      checkSecondNameInput: (e: Event): void => this.checkFileld("name", this.secondNameInput, e.target?.id),
      checkPhoneEvent: (e: Event): void => this.checkFileld("phone", this.phoneInput, e.target?.id),
      checkEmailEvent: (e: Event): void => this.checkFileld("email", this.emailInput, e.target?.id),
      handleLoginInput: (e: InputEvent): void => { this.loginInput = e.target?.value },
      handleFirstNameInput: (e: InputEvent): void => { this.firstNameInput = e.target?.value },
      handlePhoneInput: (e: InputEvent): void => { this.phoneInput = e.target?.value },
      handleSecondNameInput: (e: InputEvent): void => { this.secondNameInput = e.target?.value },
      handleDisplayNameInput: (e: InputEvent): void => { this.displayNameInput = e.target?.value },
      handleEmailInput: (e: InputEvent): void => { this.emailInput = e.target?.value },
      handleButtonSubmit: (): void => this.changeSettings(),
      handleButtonChangePassword: (): void => goToPage("/setpassword"),
    });
  };

  checkFileld(type: string, value: string, id: string ): void {
    if (!validate(type, value, id)) {
      this.isConfirmed = false;
    };
  };

  changeSettings() {
    this.isConfirmed = true;
    submitAllFields(this.element?.querySelectorAll(".js-input-validation"));

    if (!this.isConfirmed) return;

    const httptransport = new HTTPTransport();
    const data = {
      first_name: this.firstNameInput,
      second_name: this.secondNameInput,
      login: this.loginInput,
      email: this.emailInput,
      display_name: this.displayNameInput,
      phone: this.phoneInput,
    };

    httptransport.put(getUrlChangeUserData, {data})
      .then(result => {
        if ((<XMLHttpRequest>result).status === 200) {
          goToPage("/messenger")
        };
      });
  };

  render(): string {
    return settingsTemplate();
  };
};
