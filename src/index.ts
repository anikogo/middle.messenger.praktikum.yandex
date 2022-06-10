import { renderDOM } from "./utils/renderDOM";
import LoginPage from "./pages/login/index";
import RegisterPage from "./pages/register/index";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";
import { registerComponent } from "./utils/registerComponent";

document.addEventListener("DOMContentLoaded", () => {

  registerComponent(Button);
  registerComponent(Input);
  const loginPage = new LoginPage();

  const registerPage = new RegisterPage();

  //renderDOM("#app", loginPage);
  renderDOM("#app", registerPage);
})