
import Block from "./Block";

jest.mock("nanoid", () => {
  function customAlphabet(a: string, b: number) {
    return function(){ return "aaaaAbbbbB" };
  }

  return {
    "customAlphabet": customAlphabet,
   };
});


describe("src/utils/Block", () => {
  it("mount", async () => {

    const mockFn = jest.fn(() => {});

    class Test extends Block {
      render() {
        return "";
      }

      componentDidMount(): void {
        mockFn();
      }
    }

    (new Test({})).dispatchComponentDidMount();
    await sleep();
    expect(mockFn).toHaveBeenCalled();
  });

});

function sleep(ms: number = 200) {
  return new Promise(r => setTimeout(r, ms));
}
