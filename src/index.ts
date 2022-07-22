import "./scss/index.scss";
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
    loginFormError: null,
    user: {},
    isAddChatShown: false,
    searchUserList: [],
    searchUserSelected: [],
    users: [],
    userChats: [],
    currentChatId: null,
  };

  const store = new Store(defaultState);
  window.store = store;

  router
    .use("/", pages.LoginPage)
    .use("/sign-up", pages.RegisterPage)
    .use("/settings", pages.SettingsPage)
    .use("/messenger", pages.ChatsPage)
    .use("/setpassword", pages.SetPassword)
    .use("/login", pages.LoginPage)
    .use("*", pages.ErrorPage404)
    .start();

});
