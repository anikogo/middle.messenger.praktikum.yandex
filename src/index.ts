import { LoginPage,
  RegisterPage,
  ChatsPage,
  SettingsPage,
  ChangepwdPage,
  ChangepicPage,
} from "./pages";
import { Button, Input, TextArea, Error, ChatItem, Message, CogButton, DivButton } from "./components";
import { registerComponent } from "./utils/registerComponent";
import Router from "./utils/Router";

document.addEventListener("DOMContentLoaded", () => {
  registerComponent(Button);
  registerComponent(CogButton);
  registerComponent(DivButton);
  registerComponent(Input);
  registerComponent(Error);
  registerComponent(ChatItem);
  registerComponent(TextArea);
  registerComponent(Message);

  const router = new Router();

  router
    .use("/", LoginPage)
    .use("/register", RegisterPage)
    .use("/settings", SettingsPage)
    .use("/chat", ChatsPage)
    .use("/changepwd", ChangepwdPage)
    .use("/changepic", ChangepicPage)
    .use("/login", LoginPage)
    .start();
});
