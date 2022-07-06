const regExps: Record<string, RegExp> = {
  "name": /^[A-ZА-Я]{1}[a-zа-я-]*$/,
  "login": /^(?!\d+$)[[\w-]{3,20}$/,
  "password": /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d-_]{8,40}$/,
  "email": /^[\w-]+@{1}[a-z]+\.{1}[a-z]+$/,
  "phone": /^\+?[0-9]{10,15}$/,
}

function _checkField (value: string, validationType: string, errorElement: HTMLElement) {
  const isMatch = regExps[validationType].test(value);
  if (!isMatch) {
    errorElement.className = "error_visible";
    errorElement.textContent = `Wrong ${validationType} format`;
  } else {
    errorElement.className = "error_hidden";
    errorElement.textContent = ``;
  }

  return isMatch;
};

export function submitAllFields (fields: any) {
  if (!fields) return;

  for(const field of fields) {
    field.dispatchEvent(new FocusEvent("blur"));
  };
};

export function validate(type: string, value: string, id: string) {
  return _checkField(value, type, (document.getElementById(`${id}Error`)) as HTMLElement);
};
