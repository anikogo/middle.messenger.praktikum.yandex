import Block from "../../utils/Block";

export default class ErrorPage404 extends Block {
  constructor() {
    super();
  }
 
  render() {
    return `
    <main>
        <h1>Error: page not found</h1>
        <h2><a href="#app">Back to main page</a></h2>
        <div class="error-number-font">404</div>
    </main>
        `;
  };
};