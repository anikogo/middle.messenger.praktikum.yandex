import Block from "../utils/Block";

// TODO: заюзать интерфейс
// interface InputProps {
//   pholderText?: string;
//   className?: string;
//   autofocus?: string;
//   idName?: string;
//   onBlur?: () => void;
//   onFocus?: () => void;
// };

export default class TextArea extends Block {

  static get getCompName(){return "TextArea"};

  constructor({...props}) {
    super(props);
  };

  render() {
    return /*template*/`
			<textarea id="{{ idName }}" class="{{ className }}" placeholder="{{ pholderText }}" {{ focus }}></textarea>
		`;
  };
};
