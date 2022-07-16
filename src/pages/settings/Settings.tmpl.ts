export function settingsTemplate(): string {
  return /*template*/`
    <main>
      <div class="data-entry-form data-entry-form__container flex-column">
        <h1>Settings</h1>
        <div class="flex">
          {{{ DivButton
            className="data-entry-form__user-pic rounding"
            onClick=goToPwdChange
          }}}
          <div class="flex-grow-1">
            {{{ Input
              name="firstName"
              idName="firstName"
              className="data-entry-form__input js-input-validation"
              pholderText="first name"
              onBlur=checkFirstNameInput
              onFocus=checkFirstNameInput
              onInput=handleFirstNameInput
            }}}
            {{{ Error idName="firstNameError" className="data-entry-form__input-error hidden"}}}
            {{{ Input
              name="secondName"
              idName="secondName"
              className="data-entry-form__input js-input-validation"
              pholderText="second name"
              onBlur=checkSecondNameInput
              onFocus=checkSecondNameInput
              onInput=handleSecondNameInput
            }}}
            {{{ Error idName="secondNameError" className="data-entry-form__input-error hidden"}}}
          </div>
        </div>
        {{{ Input
          name="displayName"
          idName="displayName"
          className="data-entry-form__input js-input-validation"
          pholderText="display name"
          onInput=handleDisplayNameInput
        }}}
        {{{ Error idName="displayNameError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="login"
          idName="login"
          className="data-entry-form__input js-input-validation"
          pholderText="login"
          onBlur=checkLoginEvent
          onFocus=checkLoginEvent
          onInput=handleLoginInput
        }}}
        {{{ Error idName="loginError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="email"
          idName="email"
          className="data-entry-form__input js-input-validation"
          pholderText="email"
          onBlur=checkEmailEvent
          onFocus=checkEmailEvent
          onInput=handleEmailInput
        }}}
        {{{ Error idName="emailError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="phone"
          idName="phone"
          className="data-entry-form__input js-input-validation"
          pholderText="phone"
          onBlur=checkPhoneEvent
          onFocus=checkPhoneEvent
          onInput=handlePhoneInput
        }}}
        {{{ Error idName="phoneError" className="data-entry-form__input-error hidden"}}}
        <div class="data-entry-form__button-container flex">
          {{{ Button
            className="data-entry-form__button data-entry-form__button_setting_secondary rounding"
            label="Change password"
            onClick=handleButtonChangePassword
          }}}
          {{{ Button
            label="Save"
            className="data-entry-form__button data-entry-form__button_primary rounding"
            onClick=handleButtonSubmit
          }}}
        </div>
      </div>
    </main>
  `;
}
