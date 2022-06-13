
// только для второго спринта
import Block, {BlockProps} from "../../utils/Block";

interface LinkButtonProps extends BlockProps {
  label: string;
  className?: string;
  linkName?: string;
  onClick: () => void;
};

export default class LinkButton extends Block {

  static get getCompName(){return "LinkButton"};

  constructor(props: LinkButtonProps) {
    props.events = props.events || {};
    props.events.click = props.onClick;
    super(props);
  };

  render() {
    return `<a href="{{ linkName }}" class="{{ className }}">{{ label }}</a>`;
  };
};