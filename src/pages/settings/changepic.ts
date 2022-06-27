import Block from "../../utils/Block";

export default class ChangepicPage extends Block {
  constructor() {
    super();
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Change picture</h1>
          <div class="settings__user-pic_center rounding"></div>
          {{{ Button className="button__secondary-picchange-button rounding" label="Add" }}}
          <div class="button__row-container">
            {{{ Button className="button__secondary-setting-button rounding" label="Back to settings" }}}
            {{{ Button className="button__primary-button rounding" label="Save" }}}
          </div>
        </div>
      </main>
    `;
  };
};
