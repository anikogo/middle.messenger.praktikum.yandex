import Block, {BlockProps} from "../utils/Block";
import { withStore } from "../utils/withStore";
import { State } from "../utils/Store";

interface UserItemProps extends BlockProps {
  user: any;
};

export class UserItem extends Block {

  static get getCompName(){return "UserItem"};

  constructor(props: UserItemProps) {
    super({
      ...props,
      handleButtonAddUser: () => this.addUser(),
      handleButtonRemoveUser: () => this.removeUser(),
      isUserAdded: (): boolean => {return window.store.state.searchUserSelected.includes(props.user.id)},
    });
  };

  addUser() {
    if (this.props.searchUserSelected.includes(this.props.user.id)) return;

    this.dispatch({ searchUserSelected: [...this.props.searchUserSelected, this.props.user.id]});
  };

  removeUser() {
    const newArray = this.props.searchUserSelected.filter(userId => userId !== this.props.user.id);
    this.dispatch({ searchUserSelected: newArray});
  }

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      searchUserSelected: state.searchUserSelected,
    };
  };

  render() {
    return /*template*/`
      <li class="user-item rounding">
        <div class="user-item__name">
          <div>{{ user.first_name }} {{ user.first_name }}</div>
          <div>Login: {{user.login}}</div>
        </div>
        <div>
          {{#if isUserAdded}}
            {{{ Button onClick=handleButtonRemoveUser label="remove" className="button__add-remove-button rounding" }}}
          {{else}}
            {{{ Button onClick=handleButtonAddUser label="add" className="button__add-remove-button rounding" }}}
          {{/if}}
        </div>
      </li>
    `;
  };
};

export default withStore(UserItem);
