export function loginTemplate(): string {
  return /*template*/`
    <main>
      <div class="data-entry-field">
        <h1>Authorization</h1>
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
          name="password"
          idName="password"
          className="input__main-input js-input-validation"
          pholderText="password"
          onBlur=checkPwdEvent
          onFocus=checkPwdEvent
          inType="password"
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="passwordError" className="error_hidden"}}}
        <div class="button__row-container">
          {{{ Button label="Sign in" className="button__primary-button rounding" onClick=handleButtonSubmit }}}
          {{{ Button label="Register" className="button__secondary-button rounding" onClick=handleButtonRegister }}}
        </div>
      </div>
    </main>
  `;
};
