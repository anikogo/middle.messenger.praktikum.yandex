import Block from "../../utils/Block";
import { checkName, submitSettingsPage, checkEmail, checkPhone } from "../../utils/validate";

export default class SettingsPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkFnameEvent: () => checkName((this.element?.querySelector(`#firstName`) as HTMLInputElement).value),
      checkSnameEvent: () => checkName((this.element?.querySelector(`#secondName`) as HTMLInputElement).value),
      checkEmailEvent: () => checkEmail((this.element?.querySelector(`#email`) as HTMLInputElement).value),
      checkPhoneEvent: () => checkPhone((this.element?.querySelector(`#phone`) as HTMLInputElement).value),
      checkSubmitEvent: () => {
        const fields: Record<string, string> = {};
        this.element?.querySelectorAll(".js-input-validation").forEach(node => {
          fields[<string>node.getAttribute("name")] = <string>(<HTMLInputElement>node).value;
        })
        submitSettingsPage(fields);
        console.log(fields);
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
                          {{{ Input name="firstName" idName="firstName" className="input__main-input js-input-validation" pholderText="first name" onBlur=checkFnameEvent onFocus=checkFnameEvent }}}
                          {{{ Input name="secondName" idName="secondName" className="input__main-input js-input-validation" pholderText="second name" onBlur=checkSnameEvent onFocus=checkSnameEvent}}}
                      </div>
                  </div>
                  {{{ Input name="displayName" idName="displayName" className="input__main-input js-input-validation" pholderText="display name" }}}
                  {{{ Input name="email" idName="email" className="input__main-input js-input-validation" pholderText="email" onBlur=checkEmailEvent onFocus=checkEmailEvent }}}
                  {{{ Input name="phone" idName="phone" className="input__main-input js-input-validation" pholderText="phone" onBlur=checkPhoneEvent onFocus=checkPhoneEvent}}}
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