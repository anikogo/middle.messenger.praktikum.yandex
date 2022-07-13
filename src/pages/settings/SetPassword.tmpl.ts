export default function setPasswordTemplate() {
  return /*template*/`
    <main>
      <div class="data-entry-field">
        <h1>Change password</h1>
        {{{ Input
          idName="oldpwd"
          className="input__main-input js-input-validation"
          pholderText="old password"
          inType="password"
          onBlur=checkOldPwdEvent
          onFocus=checkOldPwdEvent
          onInput=handleOldPasswordInput
        }}}
        {{{ Error idName="oldpwdError" className="error_hidden"}}}
        {{{ Input
          idName="newpwd"
          className="input__main-input js-input-validation"
          pholderText="new password"
          inType="password"
          onBlur=checkPwdEvent
          onFocus=checkPwdEvent
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="newpwdError" className="error_hidden"}}}
        <div class="button__row-container">
          {{{ Button
            className="button__secondary-setting-button rounding"
            label="Back to settings"
            onClick=handleButtonBack
          }}}
          {{{ Button
            className="button__primary-button rounding"
            label="Save"
            onClick=handleButtonSubmit
          }}}
        </div>
      </div>
    </main>
  `;
}
