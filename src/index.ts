import { LoginPage,
  RegisterPage,
  ChatsPage,
  SettingsPage,
  ChangepwdPage,
  ChangepicPage,
} from "./pages";
import { Button, Input, TextArea, Error, ChatItem, Message, CogButton, DivButton, AddButton, UserItemButton } from "./components";
import { registerComponent } from "./utils/registerComponent";
import Router from "./utils/Router";
import { Store } from "./utils/Store";
import ChatModal from "./components/modal/addchatmodal";
import CloseButton from "./components/button/closebutton";
import UserList from "./components/UserList";
import UserItem from "./components/UserItem";

declare global {
  interface Window {
    store: any;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  registerComponent(Button);
  registerComponent(CogButton);
  registerComponent(AddButton)
  registerComponent(DivButton);
  registerComponent(Input);
  registerComponent(Error);
  registerComponent(ChatItem);
  registerComponent(TextArea);
  registerComponent(Message);
  registerComponent(ChatModal);
  registerComponent(CloseButton);
  registerComponent(UserList);
  registerComponent(UserItem);
  registerComponent(UserItemButton);

  const router = new Router();

  const defaultState = {
    screen: null,
    isLoading: true,
    loginFormError: null,
    user: {
      first_name: "",
      second_name: "",
    },
    isAddChatShown: false,
    searchUserList: [],
    searchUserSelected: []
  };
  const store = new Store(defaultState);
  window.store = store;

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
