import Block, { BlockInterface } from "./Block";
import isEqual from "./isEqual";
import { renderDOM } from "./renderDOM";

type props = Record<string, any>;

class Route<P = any> {
  #pathname: string;
  #blockClass: BlockInterface<P>;
  #block: Block | null = null;
  #props: any;

  constructor(pathname: string, view: BlockInterface<P>, props: props) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#block = null;
    this.#props = props;
  };

  navigate(pathname: string) {
    if (this.match(pathname)) this.render();
  };

  leave() {
    if (this.#block) this.#block.hide();
  };

  match(pathname: string) {
    return isEqual(pathname, this.#pathname) || this.#pathname === "*";
  };

  render() {
    if (!this.#block) {
      this.#block = new this.#blockClass(this.#props);
      renderDOM(this.#block);
      return;
    };
    this.#block.show();
    renderDOM(this.#block);
  };

}

export default class Router {
  static __instance: Router;
  #routers: Array<Route> = [];
  #history: History = window.history;
  #currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    };

    Router.__instance = this;
  }

  use<P>(pathname: string, block: BlockInterface<P>, props: props = {}) {
    const route = new Route(pathname, block, props);

    this.#routers.push(route);

    return this;
  };

  start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      this._onRoute((<Window>(event.currentTarget))?.location.pathname);
    });

    this._onRoute(window.location.pathname);
  };

  private _onRoute(pathname: string) {

    let route = this.getRoute(pathname);
    if (!route) return;

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.#history.pushState({}, "", pathname);
    this._onRoute(pathname);
  };

  back(): void {
    this.#history.back();
  };

  forward() {
    this.#history.forward();
  };

  getRoute(pathname: string) {
    return this.#routers.find(route => route.match(pathname));
  };

};
