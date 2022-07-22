import Block, { BlockInterface } from "./Block";
import Handlebars, { HelperOptions } from "handlebars";

export function registerComponent(Component: typeof Block | BlockInterface<any>): void {
  Handlebars.registerHelper(Component.getCompName, function({ hash , data }: HelperOptions): string {

    if (!data.root.children) {
      data.root.children = {};
    };

    const children = data.root.children;
    const component = new Component(hash);
    children[component.id] = component;
    return `<div data-id="${component.id}"></div>`;
  });

};
