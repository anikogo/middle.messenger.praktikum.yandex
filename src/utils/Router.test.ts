
import Block from "./Block";
import Router from "./Router";

jest.mock("nanoid", () => {
  function customAlphabet(a: string, b: number) {
    return function(){ return "aaaaAbbbbB" };
  }

  return {
    "customAlphabet": customAlphabet,
   };
});

describe("src/utils/Router", () => {
  it("Should go to the page", () => {

    const mainElement = document.createElement("div");
    mainElement.setAttribute("id", "app");
    document.body.appendChild(mainElement);

    class TestPage extends Block {
      render () {
        return `<div id="test-page"></div>`;
      }
    }

    const router = new Router();

    router
      .use("/test", TestPage)
      .start();

    router.go("/test");

    expect(document.getElementById("test-page")).not.toBeNull();
    expect(window.location.pathname).toBe("/test");

  });
});
