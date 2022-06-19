import Block from "./Block";
//@ts-ignore
import Handlebars, { HelperOptions } from "../../node_modules/handlebars/dist/handlebars";

export function registerComponent (Component: typeof Block) {
  Handlebars.registerHelper(Component.getCompName, function({ hash , data }: HelperOptions) {

    console.log(Component.name)
    if (!data.root.children) {
      data.root.children = {};
    };

    const children = data.root.children;
    const component = new Component(hash);
    children[component.id] = component;
    return `<div data-id="${component.id}"></div>`;
  });
};