import Block, {BlockProps} from "../utils/Block";
import octicons from "@primer/octicons";
import { withStore } from "../utils/withStore";

interface UserItemProps extends BlockProps {
  user: any;
};

export class UserItem extends Block {

  static get getCompName(){return "UserItem"};

  constructor(props: UserItemProps) {
    const { ...rest} = props;
    super({
      ...rest,
      events: {},
      addUser: (e: Event) => {
        props.store.dispatch({ searchUserSelected: [...props.store.state.searchUserSelected, this.props.user]})
      },
      removeUser: () => {

      },
    });
  };

  render() {
    return /*template*/`
      <li class="user-item" style="display: flex; flex-direction: row; justify-content: space-between; list-style: none;">
        <div class="user-item__name">
        {{ user.first_name}}
        </div>
        <div class="user-item__buttons" style="display: flex; flex-direction: row;">
          {{{ UserItemButton onClick=addUser label="add" }}}
          {{{ UserItemButton onClick=removeUser label="remove" }}}
        </div>
      </li>
    `;
  };
};

export default withStore(UserItem);
