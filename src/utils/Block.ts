import EventBus from "./EventBus";
import { customAlphabet } from "nanoid";
import Handlebars from "handlebars";

// export interface BlockMeta<P = any> {
//   props: P;
// };

export interface BlockMeta<P> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
};

export interface BlockProps {
  events?: Record<string, (() => void) | undefined>;
};

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  static get getCompName(){return ""};

  public nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', 10);
  public id = this.nanoid();

  private _element: Nullable<HTMLElement> | null = null;
  protected props: P;
  protected children: Record<string, any>;
  private _meta: BlockMeta;
  private eventBus: () => EventBus<Events>;

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus<Events>();

    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this.props = this._makePropsProxy(props);

    this._meta = { props };

    this.eventBus = () => eventBus;
    this.initChildren();
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  };

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  };

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  };

  initChildren() {
  };

  private _componentDidMount(oldProps: P) {
    this.componentDidMount(oldProps);
  }

    // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: P) {

  };

    dispatchComponentDidMoun() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    };

    this._render();
  };

    // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  };

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    };

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  };

  private _render() {
    const templateString = this.render();

    const block = this.compile(templateString, {...this.props, handlers: this.handlers()})

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    };

    this._element = newElement;
    this._addEvents();
  };

    // Может переопределять пользователь, необязательно трогать
  protected render(): string {
    return "";
  };

  getContent(): HTMLElement {
    return this.element!;
  };

  private _makePropsProxy(props: P) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: any, propName: string){
        return target[propName];
      },
      set(target: any, propName: string, value: any) {
        const currentValue = target[propName];
        target[propName] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target, [propName]: currentValue}, target);
        return true;
      },
      deleteProperty(target: any, propName: string) {
        throw new Error("Нет прав");
      },
    }) as any;
  };

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  };

  show() {
      this.getContent().style.display = "block";
  };

  hide() {
      this.getContent().style.display = "none";
  };

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    };

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  };

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    };

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  };

  compile(templateString: string, context: P) {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    const template = Handlebars.compile(templateString);

    const htmlString = template({...context, children: this.children});

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (!stub) {
        return
      };

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  };

  getChildren(propsAndChildren: P): any {
    const props: any = {};
    const children: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      };
    });

    return { props, children };
  }

  handlers() {
    return {};
  };
};
