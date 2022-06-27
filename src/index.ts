import { renderDOM } from "./utils/renderDOM";
import { LoginPage, RegisterPage, ChatsPage, SettingsPage, ChangepwdPage, ChangepicPage, ErrorPage404, ErrorPage500 } from "./pages";
import { Button, Input, TextArea, Error, ChatItem } from "./components";
import { registerComponent } from "./utils/registerComponent";

function router() {
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const chatsPage = new ChatsPage();
  const settingsPage = new SettingsPage();
  const changepwdPage = new ChangepwdPage();
  const changepicPage = new ChangepicPage();
  const errorPage404 = new ErrorPage404();
  const errorPage500 = new ErrorPage500();

  //TODO: убрать, когда будет нормальный роутер
  switch (window.location.hash) {
    case '#register':
      renderDOM("#app", registerPage);
      break;
    case '#chat':
      renderDOM("#app", chatsPage);
      break;
    case '#settings':
      renderDOM("#app", settingsPage);
      break;
    case '#changepwd':
      renderDOM("#app", changepwdPage);
      break;
    case '#changepic':
      renderDOM("#app", changepicPage);
      break;
    case '#404':
      renderDOM("#app", errorPage404);
      break;
    case '#500':
      renderDOM("#app", errorPage500);
      break;
    default:
      renderDOM("#app", loginPage);
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Error);
  registerComponent(ChatItem);
  registerComponent(TextArea);

  router();
});

window.addEventListener("hashchange", router);
