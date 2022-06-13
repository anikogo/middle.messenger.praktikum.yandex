import Block from "./Block";
import Handlebars, { HelperOptions } from "../../node_modules/handlebars/dist/handlebars.js";

export function registerComponent (Component: typeof Block) {
  Handlebars.registerHelper(Component.name, function({ hash , data }: HelperOptions) {

    if (!data.root.children) {
      data.root.children = {};
    };

    const children = data.root.children;
    const component = new Component(hash);
    children[component.id] = component;
    return `<div data-id="${component.id}"></div>`;
  });
};