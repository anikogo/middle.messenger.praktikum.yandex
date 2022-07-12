import Block, {BlockProps} from "../utils/Block";
import { State } from "../utils/Store";
import { withStore } from "../utils/withStore";

interface UserListProps extends BlockProps {
  users: any[]
};

export class UserList extends Block {

  static get getCompName(){return "UserList"};

  constructor(props: UserListProps) {
    const { ...rest} = props;
    super({
      ...rest,
      events: {}
    });
  };

  public static mapStateToProps(state: State): Record<string, unknown> {
    return {
      users: state.searchUserList,
    }
  }

  render() {
    return /*template*/`
      <ul class="user-list">
        {{#each users}}
          {{{ UserItem user=this }}}
        {{/each}}
      </ul>
    `;
  };
};

export default withStore(UserList);
