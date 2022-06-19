import Block from "../../utils/Block";

export default class ChangepwdPage extends Block {
  constructor() {
    super();
  }
 
  render() {
    return `
    <main>
          <div class="data-entry-field">
              <h1>Change password</h1>
              {{{ Input idName="oldpwd" className="input__main-input" pholderText="old password" inType="password" }}}
              {{{ Input idName="newpwd" className="input__main-input" pholderText="new password" inType="password" }}}
              {{{ Input idName="reppwd" className="input__main-input" pholderText="repeat password" inType="password" }}}
              <div class="button__row-container">
                  {{{ LinkButton 
                      className="button__secondary-setting-button rounding"
                      label="Back to settings"
                      linkName="#settings"
                  }}}
                  {{{ LinkButton className="button__primary-button rounding"
                      label="Save"
                      linkName="#settings"
                  }}}
              </div>
          </div>
      </main>
        `;
  };
};