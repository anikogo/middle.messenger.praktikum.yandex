import Block from "../../utils/Block";
import { checkLogin, checkPassword, checkName, submitRegPage, checkEmail, checkPhone } from "../../utils/validate";


export default class RegisterPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkLoginEvent: () => {
        let inputValue = (this.element?.querySelector(`#login`) as HTMLInputElement).value;
        checkLogin(inputValue)
      },
      checkFnameEvent: () => {
        let inputValue = (this.element?.querySelector(`#firstName`) as HTMLInputElement).value;
        checkName(inputValue)
      },
      checkSnameEvent: () => {
        let inputValue = (this.element?.querySelector(`#secondName`) as HTMLInputElement).value;
        checkName(inputValue)
      },
      checkPwdEvent: () => {
        let inputValue = (this.element?.querySelector(`#password`) as HTMLInputElement).value;
        checkPassword(inputValue);
      },
      checkRPwdEvent: () => {
        let inputValue = (this.element?.querySelector(`#rPassword`) as HTMLInputElement).value;
        checkPassword(inputValue);
      },
      checkEmailEvent: () => {
        let inputValue = (this.element?.querySelector(`#email`) as HTMLInputElement).value;
        checkEmail(inputValue);
      },
      checkPhoneEvent: () => {
        let inputValue = (this.element?.querySelector(`#phone`) as HTMLInputElement).value;
        checkPhone(inputValue);
      },
      checkSubmitEvent: () => {
        const allFields: any ={};
        allFields["firstName"] = (this.element?.querySelector(`#firstName`) as HTMLInputElement).value;
        allFields["secondName"] = (this.element?.querySelector(`#secondName`) as HTMLInputElement).value;
        allFields["login"] = (this.element?.querySelector(`#login`) as HTMLInputElement).value;
        allFields["email"] = (this.element?.querySelector(`#email`) as HTMLInputElement).value;
        allFields["phone"] = (this.element?.querySelector(`#phone`) as HTMLInputElement).value;
        allFields["password"] = (this.element?.querySelector(`#password`) as HTMLInputElement).value;
        allFields["repeatPassword"] = (this.element?.querySelector(`#rPassword`) as HTMLInputElement).value;
        console.log(allFields);
        submitRegPage(allFields.firstName, allFields.secondName, allFields.login, allFields.email, allFields.phone, allFields.password, allFields.repeatPassword);
      },
    });
  }
 
  render() {
    return `
            <main>
            <div class="data-entry-field">
                <h1>Registration</h1>
                {{{ Input 
                  idName="firstName" className="input__main-input" pholderText="first name" onBlur=checkFnameEvent onFocus=checkFnameEvent
                }}}
                {{{ Input 
                  idName="secondName" className="input__main-input" pholderText="second name" onBlur=checkSnameEvent onFocus=checkSnameEvent
                }}}
                {{{ Input 
                  idName="login" className="input__main-input" pholderText="login" onBlur=checkLoginEvent onFocus=checkLoginEvent
                }}}
                {{{ Input 
                  idName="email" className="input__main-input" pholderText="email" onBlur=checkEmailEvent onFocus=checkEmailEvent
                }}}
                {{{ Input 
                  idName="phone" className="input__main-input" pholderText="phone" onBlur=checkPhoneEvent onFocus=checkPhoneEvent
                }}}
                {{{ Input 
                  idName="password" className="input__main-input" pholderText="password" inType="password" onBlur=checkPwdEvent onFocus=checkPwdEvent
                }}}
                {{{ Input 
                  idName="rPassword" className="input__main-input" pholderText="repeat password" inType="password" onBlur=checkRPwdEvent onFocus=checkRPwdEvent
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