import * as pages from "./pages";
import * as components from "./components";
import * as modules from "./modules";
import { registerComponent } from "./utils/registerComponent";
import Router from "./utils/Router";
import { Store } from "./utils/Store";

declare global {
  interface Window {
    store: any;
  }
};

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

Object.values(modules).forEach((Module: any) => {
  registerComponent(Module);
});

document.addEventListener("DOMContentLoaded", () => {

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
    searchUserSelected: [],
  };

  const store = new Store(defaultState);
  window.store = store;

  router
    .use("/", pages.LoginPage)
    .use("/register", pages.RegisterPage)
    .use("/settings", pages.SettingsPage)
    .use("/chat", pages.ChatsPage)
    .use("/changepwd", pages.ChangepwdPage)
    .use("/changepic", pages.ChangepicPage)
    .use("/login", pages.LoginPage)
    .start();

});
