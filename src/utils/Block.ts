import EventBus from "./EventBus";
import { nanoid } from "nanoid";

interface BlockMeta {
  props: any;
};

type Events = Values<typeof Block.EVENTS>;

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  public id = nanoid(6);

  private _element: Nullable<HTMLElement> | null = null;
  protected props: any;
  protected children: Record<string, any>;
  private _meta: BlockMeta;
  private eventBus: () => EventBus<Events>;

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus<Events>();

    const { props, children } = this.getChildren(propsAndChildren);
    // this.children = new Proxy(children, {
    //   set(target: any, key: string, value: any) {
    //     target[key] = value;
    //     eventBus.emit(Block.EVENTS.FLOW_RENDER);
    //     return true;
    //   }
    // });
    this.children = children;
    this.props = this._makePropsProxy(props);

    
    this._meta = {
      props
    };    

    this.eventBus = () => eventBus;
    this.initChildren();
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  initChildren() {
  }

  _componentDidMount(oldProps: any) {
    this.componentDidMount(oldProps);
  }

    // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: any) {
  
  }

    dispatchComponentDidMoun() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

    // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    const newElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

    // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment;
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    
    return new Proxy(props as any, {
      get(target: any, propName: string){
        // if (propName in target) {
          return target[propName];
        // } else {
        //   throw new Error("Property not found"); 
        // };
      },
      set(target: any, propName: string, value: any) {
        const currentValue = target[propName];
        target[propName] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target, [propName]: currentValue}, target);
        return true;
      },
      deleteProperty(target: any, propName: string) {
        throw new Error("Нет прав");
      } 
    }) as any;
  };

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
      this.getContent().style.display = "block";
  }

  hide() {
      this.getContent().style.display = "none";
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    

    // Object.entries(this.children).forEach(([key, child]) => {
    //   context[key] = `<div data-id="id-${child.id}"></div>`
    // })

    const htmlString = template({...context, children: this.children});
    
    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return
      }

      stub.replaceWith(child.getContent()!); 
    }) 

    return fragment.content;
  }

  getChildren(propsAndChildren: any): any {
    const props: any = {};
    const children: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      };
    });

    return { props, children }
  }
}