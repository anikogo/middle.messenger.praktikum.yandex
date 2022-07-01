import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { validate, submitAllFields } from "../../utils/Validate";

export default class ChangepwdPage extends Block {
  constructor(props?: any) {
    super({props,
      checkPwdEvent: validate("password"),
      checkSubmitEvent: () => submitAllFields(this.element?.querySelectorAll(".js-input-validation")),
      goToSettings: () => {
        const router = new Router();
        router.go("/settings")
      }
    });
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Change password</h1>
          {{{ Input
            idName="oldpwd"
            className="input__main-input js-input-validation"
            pholderText="old password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
          }}}
          {{{ Error idName="oldpwdError" className="error_hidden"}}}
          {{{ Input
            idName="newpwd"
            className="input__main-input js-input-validation"
            pholderText="new password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
          }}}
          {{{ Error idName="newpwdError" className="error_hidden"}}}
          {{{ Input
            idName="reppwd"
            className="input__main-input js-input-validation"
            pholderText="repeat password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
          }}}
          {{{ Error idName="reppwdError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button
              className="button__secondary-setting-button rounding"
              label="Back to settings"
              onClick=goToSettings
            }}}
            {{{ Button
              className="button__primary-button rounding"
              label="Save"
              onClick=checkSubmitEvent
            }}}
          </div>
        </div>
      </main>
    `;
  };
};
