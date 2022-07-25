import { getUrlChangeUserPassword } from "../../api/requestUrlAPI";
import Block from "../../utils/Block";
import goToPage from "../../utils/goToPage";
import { HTTPTransport } from "../../api/requestAPI";
import { validate, submitAllFields } from "../../utils/validate";
import setPasswordTemplate from "./SetPassword.tmpl";

export default class SetPassword extends Block {

  private oldPasswordInput: string = "";
  private passwordInput: string = "";
  private isConfirmed: boolean = true;

  constructor(props?: any) {
    super({ props,
      checkPwdEvent: (e: Event): void => this.checkFileld("password", this.passwordInput, (<HTMLInputElement>(e.target)).id),
      checkOldPwdEvent: (e: Event): void => this.checkFileld("password", this.oldPasswordInput, (<HTMLInputElement>(e.target)).id),
      handlePasswordInput: (e: InputEvent): void => { this.passwordInput = (<HTMLInputElement>(e.target)).value },
      handleOldPasswordInput: (e: InputEvent): void => { this.oldPasswordInput = (<HTMLInputElement>(e.target)).value },
      handleButtonSubmit: () => this.changePassword(),
      handleButtonBack: () => goToPage("/settings")
    });
  }

  checkFileld(type: string, value: string, id: string ): void {
    if (!validate(type, value, id)) {
      this.isConfirmed = false;
    }
  }

  changePassword(): void {
    this.isConfirmed = true;
    submitAllFields(this.element?.querySelectorAll(".js-input-validation"));

    if (!this.isConfirmed) return;

    const httptransport = new HTTPTransport();
    const data = {
      oldPassword: this.oldPasswordInput,
      newPassword: this.passwordInput,
    };

    httptransport.put(getUrlChangeUserPassword, { data })
      .then((result) => {
        if ((<XMLHttpRequest>result).status === 200) {
          goToPage("/settings");
        } else {
            throw new Error(result.response);
        }
      });
  }

  render(): string {
    return setPasswordTemplate();
  }
}
