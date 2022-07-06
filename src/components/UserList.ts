import Block, {BlockProps} from "../utils/Block";

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

  render() {
    return /*template*/`
      <ul class="user-list" style="padding: 0;">
        {{#each users}}
          {{{ UserItem user=this }}}
        {{/each}}
      </ul>
    `;
  };
};

export default UserList;
