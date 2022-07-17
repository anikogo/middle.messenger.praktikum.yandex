export default function setPasswordTemplate() {
  return /*template*/`
    <main>
      <div class="data-entry-form data-entry-form__container flex-column">
        <h1>Change password</h1>
        {{{ Input
          idName="oldpwd"
          className="data-entry-form__input js-input-validation"
          pholderText="old password"
          inType="password"
          onBlur=checkOldPwdEvent
          onFocus=checkOldPwdEvent
          onInput=handleOldPasswordInput
        }}}
        {{{ Error idName="oldpwdError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          idName="newpwd"
          className="data-entry-form__input js-input-validation"
          pholderText="new password"
          inType="password"
          onBlur=checkPwdEvent
          onFocus=checkPwdEvent
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="newpwdError" className="data-entry-form__input-error hidden"}}}
        <div class="data-entry-form__button-container flex">
          {{{ Button
            className="data-entry-form__button data-entry-form__button_setting_secondary rounding"
            label="Back to settings"
            onClick=handleButtonBack
          }}}
          {{{ Button
            className="data-entry-form__button data-entry-form__button_primary rounding"
            label="Save"
            onClick=handleButtonSubmit
          }}}
        </div>
      </div>
    </main>
  `;
}
