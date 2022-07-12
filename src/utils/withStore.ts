import {BlockMeta} from "../utils/Block";
import {Action, State, Store} from "../utils/Store";

type WithStateProps = { store: Store<State> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockMeta<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      const stateProps = WrappedBlock.mapStateToProps(window.store.state);
      // console.log(stateProps);


      super({ ...props, ...stateProps });
    }

    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */

      const stateProps = WrappedBlock.mapStateToProps(window.store.state);
      // console.log(stateProps);
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...stateProps });
    }

    componentDidMount() {
      // if (props) {
        super.componentDidMount();
        // console.log(this, this.__onChangeStoreCallback)
        window.store.on('changed', this.__onChangeStoreCallback);
      // }
    }

    // componentWillUnmount() {
    //   super.componentWillUnmount();
    //   window.store.off('changed', this.__onChangeStoreCallback);
    // }

    mapStateToProps(state: State) {
      if (typeof super.mapStateToProps === 'function') {
        return super.mapStateToProps(state);
      } else {
        return {};
      };
    };

    dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any): void {
      window.store.dispatch(nextStateOrAction, payload)
    }

    // set(nextState: Partial<State>) {
    //   window.store.set(nextState);
    // };

  } as BlockMeta<Omit<P, 'store'>>;
}
