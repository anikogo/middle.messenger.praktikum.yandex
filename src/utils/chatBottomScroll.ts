export default function chatBottomScroll() {
  const elem: HTMLDivElement= document.getElementById("messages-area");
  if (elem) {
    elem.scrollTop = elem.scrollHeight;
  };
};
