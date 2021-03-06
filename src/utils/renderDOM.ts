import Block from "./Block";

export function renderDOM(component: Block) {
  const root = document.querySelector("#app");

  if (!root) {
    throw new Error("Root element not found");
  }

  root.innerHTML = "";
  root.append(component.getContent()!);

};
