import Block from "../../utils/Block";

export default class ChangepwdPage extends Block {
  constructor() {
    super();
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Change password</h1>
          {{{ Input
            idName="oldpwd"
            className="input__main-input"
            pholderText="old password"
            inType="password"
          }}}
          {{{ Input
            idName="newpwd"
            className="input__main-input"
            pholderText="new password"
            inType="password"
          }}}
          {{{ Input
            idName="reppwd"
            className="input__main-input"
            pholderText="repeat password"
            inType="password"
          }}}
          <div class="button__row-container">
            {{{ Button className="button__secondary-setting-button rounding" label="Back to settings" }}}
            {{{ Button className="button__primary-button rounding" label="Save" }}}
          </div>
        </div>
      </main>
    `;
  };
};
