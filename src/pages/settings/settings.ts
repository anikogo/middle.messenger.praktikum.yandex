import Block from "../../utils/Block";
import { validate, submitAllFields } from "../../utils/validate";
import Router from "../../utils/Router";

export default class SettingsPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkLoginEvent: validate("login"),
      checkNameEvent: validate("name"),
      checkEmailEvent: validate("email"),
      checkPhoneEvent: validate("phone"),
      checkSubmitEvent: () => submitAllFields(this.element?.querySelectorAll(".js-input-validation")),
      goToPwdChange: () => {
        const router = new Router();
        router.go("/changepic");
      },
    });
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Settings</h1>
          <div class="settings__user-container">
            {{{ DivButton
              className="settings__user-pic rounding"
              onClick=goToPwdChange
            }}}
            <div class="input__settings-name-container">
              {{{ Input
                name="firstName"
                idName="firstName"
                className="input__main-input js-input-validation"
                pholderText="first name"
                onBlur=checkNameEvent
                onFocus=checkNameEvent
              }}}
              {{{ Error idName="firstNameError" className="error_hidden"}}}
              {{{ Input
                name="secondName"
                idName="secondName"
                className="input__main-input js-input-validation"
                pholderText="second name"
                onBlur=checkNameEvent
                onFocus=checkNameEvent
              }}}
              {{{ Error idName="secondNameError" className="error_hidden"}}}
            </div>
          </div>
          {{{ Input
            name="displayName"
            idName="displayName"
            className="input__main-input js-input-validation"
            pholderText="display name"
          }}}
          {{{ Error idName="displayNameError" className="error_hidden"}}}
          {{{ Input
            name="email"
            idName="email"
            className="input__main-input js-input-validation"
            pholderText="email"
            onBlur=checkEmailEvent
            onFocus=checkEmailEvent
          }}}
          {{{ Error idName="emailError" className="error_hidden"}}}
          {{{ Input
            name="phone"
            idName="phone"
            className="input__main-input js-input-validation"
            pholderText="phone"
            onBlur=checkPhoneEvent
            onFocus=checkPhoneEvent
          }}}
          {{{ Error idName="phoneError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button
              className="button__secondary-setting-button rounding"
              label="Change password"
              onClick=goToPwdChange
            }}}
            {{{ Button
              label="Save"
              className="button__primary-button rounding"
              onClick=checkSubmitEvent
            }}}
          </div>
        </div>
      </main>
    `;
  };
};
