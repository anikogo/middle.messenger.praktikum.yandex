import Block, {BlockProps} from "../utils/Block";

interface ErrorProps extends BlockProps {
  className?: string;
  idName?: string;
};

export default class Error extends Block {

  static get getCompName(){return "Error"};

  constructor(props: ErrorProps) {
    super(props);
  };

  render() {
    return /*template*/`
			<div id="{{ idName }}" class="{{ className }}" ></div>
		`;
  };
};
