import Block, {BlockProps} from "../utils/Block";
import { withStore } from "../utils/withStore";
import { Store } from "../utils/Store";

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
      handleButtonAddUser: (e: Event) => this.addUser(),
      removeUser: () => {

      },
    });
  };

  addUser() {
    this.dispatch({ searchUserSelected: [...props.store.state.searchUserSelected, this.props.user]})
  }

  render() {
    return /*template*/`
      <li class="user-item" style="display: flex; flex-direction: row; justify-content: space-between; list-style: none;">
        <div class="user-item__name">
        {{ user.first_name}}
        </div>
        <div class="user-item__buttons" style="display: flex; flex-direction: row;">
        {{#if }}
          {{{ Button onClick=addUser label="+" }}}
        {{else}}
          {{{ Button onClick=removeUser label="-" }}}
        {{/if}}
        </div>
      </li>
    `;
  };
};

export default withStore(UserItem);
