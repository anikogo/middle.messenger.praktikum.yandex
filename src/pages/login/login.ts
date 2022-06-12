import Block from "../../utils/Block";
import { checkLogin, checkPassword, submitLoginPage } from "../../utils/validate";

export default class LoginPage extends Block {
  constructor(props?: any) {
    
    super({...props,
      checkNameEvent: () => {
        let inputValue = (this.element?.querySelector(`#login`) as HTMLInputElement).value;
        checkLogin(inputValue)
      },
      checkPwdEvent: () => {
        let inputValue = (this.element?.querySelector(`#password`) as HTMLInputElement).value;
        checkPassword(inputValue);
      },
      checkSubmitEvent: () => {
        const allFields: any ={};
        allFields["login"] = (this.element?.querySelector(`#login`) as HTMLInputElement).value;
        allFields["password"] = (this.element?.querySelector(`#password`) as HTMLInputElement).value;
        console.log(allFields);
        submitLoginPage(allFields.login, allFields.password);
      },
    });

  };

  render() {
    return `<main>
                <div class="data-entry-field">
                    <h1>Authorization</h1>
                    {{{ Input idName="login" className="input__main-input" pholderText="login" onBlur=checkNameEvent onFocus=checkNameEvent }}}
                    {{{ Input idName="password" className="input__main-input" pholderText="password" onBlur=checkPwdEvent onFocus=checkPwdEvent inType="password"}}}
                    <div class="button__row-container">
                        {{{ Button label="Sign in" className="button__primary-button rounding" onClick=checkSubmitEvent }}}
                        {{{ LinkButton label="Register" className="button__secondary-button rounding" linkName="#register"}}}
                    </div>
                    {{{ Error idName="error" className="error_hide"}}}
                </div>
            </main>`;
  };
};