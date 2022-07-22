import {BlockInterface} from "../utils/Block";
import {Action, State, Store} from "../utils/Store";

type WithStateProps = { store: Store<State> };

interface SmartBlock<P> extends BlockInterface<P> {
  mapStateToProps(state: Record<string, unknown>): Record<string, unknown>;
}

export function withStore<P extends WithStateProps>(WrappedBlock: SmartBlock<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      const stateProps = WrappedBlock.mapStateToProps(window.store.state);

      super({ ...props, ...stateProps });
    };

    __onChangeStoreCallback = () => {
      const stateProps = WrappedBlock.mapStateToProps(window.store.state);
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...stateProps });
    };

    componentDidMount() {
      super.componentDidMount();
      window.store.on('changed', this.__onChangeStoreCallback);
    };

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    };

    // mapStateToProps(state: State): Record<string, unknown> {
    //   if (typeof super.mapStateToProps === 'function') {
    //     return super.mapStateToProps(state);
    //   } else {
    //     return {};
    //   };
    // };

    dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any): void {
      window.store.dispatch(nextStateOrAction, payload);
    };

  } as BlockInterface<Omit<P, 'store'>>;
}
