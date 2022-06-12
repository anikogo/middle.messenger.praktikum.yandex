import Block from "../../utils/Block";


interface InputProps {
  className?: string;
  className_user?: string;
  className_preview?: string;
  text_user?: string;
}

export default class ChatItem extends Block {
  constructor({...props}) {
    super(props);
  }

  render() {
    return `
    <div class="{{ className }}">
        <div class="{{ className_user }}">{{ text_user }}</div>
        <div class="{{ className_preview }}">Hello my friend, I,m {{ text_user }}</div>
    </div>
    `;
  }
};