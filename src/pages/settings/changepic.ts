import Block from "../../utils/Block";

export default class ChangepicPage extends Block {
  constructor() {
    super();
  }
 
  render() {
    return `
    <main>
          <div class="data-entry-field">
              <h1>Change picture</h1>
              <div class="settings__user-pic_center rounding"></div>
              {{{ Button className="button__secondary-picchange-button rounding" label="Add new" }}}
              <div class="button__row-container">
                  {{{ LinkButton
                      className="button__secondary-setting-button rounding"
                      label="Back to settings"
                      linkName="#settings"
                  }}}
                  {{{ LinkButton 
                      className="button__primary-button rounding"
                      label="Save"
                      linkName="#settings"
                  }}}
              </div>
          </div>
      </main>
        `;
  };
};