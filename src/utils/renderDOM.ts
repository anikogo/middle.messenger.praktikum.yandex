import Block from "./Block";

export function renderDOM(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);
  
  if (!root) {
    throw new Error("Root element not found");
  }

  component.dispatchComponentDidMoun();

  root.innerHTML = "";
  root.append(component.getContent()!);
};