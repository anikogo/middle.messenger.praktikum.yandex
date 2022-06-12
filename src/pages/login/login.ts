import Block from "../../utils/Block";
import { checkLogin, checkPassword, submitLoginPage } from "../../utils/validate";

export default class LoginPage extends Block {
  constructor(props?: any) {
    
    super({...props,
      checkLoginEvent: () => checkLogin((this.element?.querySelector(`#login`) as HTMLInputElement).value),
      checkPwdEvent: () => checkPassword((this.element?.querySelector(`#password`) as HTMLInputElement).value),
      checkSubmitEvent: () => {
        const fields: Record<string, string> = {};
        this.element?.querySelectorAll(".js-input-validation").forEach(node => {
          fields[<string>node.getAttribute("name")] = <string>(<HTMLInputElement>node).value;
        });
        submitLoginPage(fields);
        console.log(fields);
      },
    });
  };

  render() {
    return `
            <main>
                <div class="data-entry-field">
                    <h1>Authorization</h1>
                    {{{ Input name="login" idName="login" className="input__main-input js-input-validation" pholderText="login" onBlur=checkNameEvent onFocus=checkNameEvent }}}
                    {{{ Input name="password" idName="password" className="input__main-input js-input-validation" pholderText="password" onBlur=checkPwdEvent onFocus=checkPwdEvent inType="password"}}}
                    <div class="button__row-container">
                        {{{ Button label="Sign in" className="button__primary-button rounding" onClick=checkSubmitEvent }}}
                        {{{ LinkButton label="Register" className="button__secondary-button rounding" linkName="#register"}}}
                    </div>
                    {{{ Error idName="error" className="error_hide"}}}
                </div>
            </main>
            `;
  };
};