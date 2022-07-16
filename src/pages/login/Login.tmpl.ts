export function loginTemplate(): string {
  return /*template*/`
    <main>
      <div class="data-entry-form data-entry-form__container flex-column">
        <h1>Authorization</h1>
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
          name="password"
          idName="password"
          className="data-entry-form__input js-input-validation"
          pholderText="password"
          onBlur=checkPwdEvent
          onFocus=checkPwdEvent
          inType="password"
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="passwordError" className="data-entry-form__input-error hidden"}}}
        <div class="data-entry-form__button-container flex">
          {{{ Button
            label="Sign in"
            className="data-entry-form__button data-entry-form__button_primary rounding"
            onClick=handleButtonSubmit
          }}}
          {{{ Button
            label="Register"
            className="data-entry-form__button data-entry-form__button_secondary rounding"
            onClick=handleButtonRegister
          }}}
        </div>
      </div>
    </main>
  `;
};
