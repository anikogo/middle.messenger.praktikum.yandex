import Block, {BlockProps} from "../../utils/Block";

interface ErrorProps extends BlockProps {
  className?: string;
  idName?: string;
}

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return `<div id="{{ idName }}" class="{{ className }}" ></div>`;
  }
};