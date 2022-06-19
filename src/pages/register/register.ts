import Block from "../../utils/Block";
import { checkLogin, checkPassword, checkName, submitRegPage, checkEmail, checkPhone } from "../../utils/validate";


export default class RegisterPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkLoginEvent: () => checkLogin((this.element?.querySelector(`#login`) as HTMLInputElement).value),
      checkFnameEvent: () => checkName((this.element?.querySelector(`#firstName`) as HTMLInputElement).value),
      checkSnameEvent: () => checkName((this.element?.querySelector(`#secondName`) as HTMLInputElement).value),
      checkPwdEvent: () => checkPassword((this.element?.querySelector(`#password`) as HTMLInputElement).value),
      checkRPwdEvent: () => checkPassword((this.element?.querySelector(`#rPassword`) as HTMLInputElement).value),
      checkEmailEvent: () => checkEmail((this.element?.querySelector(`#email`) as HTMLInputElement).value),
      checkPhoneEvent: () => checkPhone((this.element?.querySelector(`#phone`) as HTMLInputElement).value),
      checkSubmitEvent: () => {
        const fields: Record<string, string> = {};
        this.element?.querySelectorAll(".js-input-validation").forEach(node => {
          fields[<string>node.getAttribute("name")] = <string>(<HTMLInputElement>node).value;
        })
        submitRegPage(fields);
        console.log(fields);
      },
    });
  }
 
  render() {
    return `
            <main>
            <div class="data-entry-field">
                <h1>Registration</h1>
                {{{ Input name="firstName" 
                  idName="firstName" className="input__main-input js-input-validation" pholderText="first name" onBlur=checkFnameEvent onFocus=checkFnameEvent
                }}}
                {{{ Input name="secondName"
                  idName="secondName" className="input__main-input js-input-validation" pholderText="second name" onBlur=checkSnameEvent onFocus=checkSnameEvent
                }}}
                {{{ Input name="login"
                  idName="login" className="input__main-input js-input-validation" pholderText="login" onBlur=checkLoginEvent onFocus=checkLoginEvent
                }}}
                {{{ Input name="email"
                  idName="email" className="input__main-input js-input-validation" pholderText="email" onBlur=checkEmailEvent onFocus=checkEmailEvent
                }}}
                {{{ Input name="phone"
                  idName="phone" className="input__main-input js-input-validation" pholderText="phone" onBlur=checkPhoneEvent onFocus=checkPhoneEvent
                }}}
                {{{ Input name="password"
                  idName="password" className="input__main-input js-input-validation" pholderText="password" inType="password" onBlur=checkPwdEvent onFocus=checkPwdEvent
                }}}
                {{{ Input name="rPassword"
                  idName="rPassword" className="input__main-input js-input-validation" pholderText="repeat password" inType="password" onBlur=checkRPwdEvent onFocus=checkRPwdEvent
                }}}
                <div class="button__row-container">
                  {{{ LinkButton label="Sign in" className="button__secondary-button rounding" linkName="#app" }}}
                  {{{ Button label="Register" className="button__primary-button rounding" onClick=checkSubmitEvent }}}            
                </div>
                {{{ Error idName="error" className="error_hide"}}}
            </div>
        </main>
        `;
  };
};