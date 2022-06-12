import Block from "../../utils/Block";
import { checkName, submitSettingsPage, checkEmail, checkPhone } from "../../utils/validate";

export default class SettingsPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkFnameEvent: () => {
        let inputValue = (this.element?.querySelector(`#firstName`) as HTMLInputElement).value;
        checkName(inputValue)
      },
      checkSnameEvent: () => {
        let inputValue = (this.element?.querySelector(`#secondName`) as HTMLInputElement).value;
        checkName(inputValue)
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
        allFields["displayName"] = (this.element?.querySelector(`#displayName`) as HTMLInputElement).value;
        allFields["email"] = (this.element?.querySelector(`#email`) as HTMLInputElement).value;
        allFields["phone"] = (this.element?.querySelector(`#phone`) as HTMLInputElement).value;
        console.log(allFields);
        submitSettingsPage(allFields.firstName, allFields.secondName, allFields.email, allFields.phone);
      },
    });
  }
 
  render() {
    return `
    <main>
          <div class="data-entry-field">
              <h1>Settings</h1>
              <div>
                  <div class="settings__user-container">
                      <div><a class="settings__user-pic rounding" href="#changepic"></a></div>
                      <div class="input__settings-name-container">
                          {{{ Input idName="firstName" className="input__main-input" pholderText="first name" onBlur=checkFnameEvent onFocus=checkFnameEvent }}}
                          {{{ Input idName="secondName" className="input__main-input" pholderText="second name" onBlur=checkSnameEvent onFocus=checkSnameEvent}}}
                      </div>
                  </div>
                  {{{ Input idName="displayName" className="input__main-input" pholderText="display name" }}}
                  {{{ Input idName="email" className="input__main-input" pholderText="email" onBlur=checkEmailEvent onFocus=checkEmailEvent }}}
                  {{{ Input idName="phone" className="input__main-input" pholderText="phone" onBlur=checkPhoneEvent onFocus=checkPhoneEvent}}}
              </div>
              <div class="button__row-container">
                  {{{ LinkButton 
                      className="button__secondary-setting-button rounding"
                      label="Change password"
                      linkName="#changepwd"
                  }}}
                  {{{ Button label="Save" className="button__primary-button rounding" onClick=checkSubmitEvent }}}  
              </div>
              {{{ Error idName="error" className="error_hide"}}}
          </div>
      </main>
        `;
  };
};