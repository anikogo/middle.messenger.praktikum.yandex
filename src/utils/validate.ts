const regExps: Record<string, RegExp> = {
  "name": /^[A-ZА-Я]{1}[a-zа-я-]*$/,
  "login": /^(?!\d+$)[[\w-]{3,20}$/,
  "password": /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d-_]{8,40}$/,
  "email": /^[\w-]+@{1}[a-z]+\.{1}[a-z]+$/,
  "phone": /^\+?[0-9]{10,15}$/,
}

function _checkField (value: string, validationType: string, errorElement: HTMLElement): void {
  const isMatch = regExps[validationType].test(value);
  errorElement.className = isMatch ? "error_hidden" : "error_visible";
  errorElement.textContent = isMatch ? "" : `Wrong ${validationType} format`;
};

export function submitAllFields (fields: NodeListOf<Element> | undefined): void {
  if (!fields) return;

  for(const field of fields) {
    field.dispatchEvent(new FocusEvent("blur"));
  };

};

export function validate(type: string) {
  return function (e: any) {
    return _checkField(e.target?.value, type, (document.getElementById(`${e.target.id}Error`)) as HTMLElement);
  };
};
