export function settingsTemplate(): string {
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
              onBlur=checkFirstNameInput
              onFocus=checkFirstNameInput
              onInput=handleFirstNameInput
            }}}
            {{{ Error idName="firstNameError" className="error_hidden"}}}
            {{{ Input
              name="secondName"
              idName="secondName"
              className="input__main-input js-input-validation"
              pholderText="second name"
              onBlur=checkSecondNameInput
              onFocus=checkSecondNameInput
              onInput=handleSecondNameInput
            }}}
            {{{ Error idName="secondNameError" className="error_hidden"}}}
          </div>
        </div>
        {{{ Input
          name="displayName"
          idName="displayName"
          className="input__main-input js-input-validation"
          pholderText="display name"
          onInput=handleDisplayNameInput
        }}}
        {{{ Error idName="displayNameError" className="error_hidden"}}}
        {{{ Input
          name="login"
          idName="login"
          className="input__main-input js-input-validation"
          pholderText="login"
          onBlur=checkLoginEvent
          onFocus=checkLoginEvent
          onInput=handleLoginInput
        }}}
        {{{ Error idName="loginError" className="error_hidden"}}}
        {{{ Input
          name="email"
          idName="email"
          className="input__main-input js-input-validation"
          pholderText="email"
          onBlur=checkEmailEvent
          onFocus=checkEmailEvent
          onInput=handleEmailInput
        }}}
        {{{ Error idName="emailError" className="error_hidden"}}}
        {{{ Input
          name="phone"
          idName="phone"
          className="input__main-input js-input-validation"
          pholderText="phone"
          onBlur=checkPhoneEvent
          onFocus=checkPhoneEvent
          onInput=handlePhoneInput
        }}}
        {{{ Error idName="phoneError" className="error_hidden"}}}
        <div class="button__row-container">
          {{{ Button
            className="button__secondary-setting-button rounding"
            label="Change password"
            onClick=handleButtonChangePassword
          }}}
          {{{ Button
            label="Save"
            className="button__primary-button rounding"
            onClick=handleButtonSubmit
          }}}
        </div>
      </div>
    </main>
  `;
}
