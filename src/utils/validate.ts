import { ChatsPage } from "../pages";

export function checkName(name: string): string {
  const reg: RegExp = /^[A-ZА-Я]{1}[a-zа-я-]*$/;
  const err: HTMLElement = document.querySelector(`#error`) as HTMLElement;
  if (reg.test(name)) {
    err.className === "error_visible" ? err.className = "error_hide"  : null;
    err.textContent = "";
  } else {
    err.className === "error_hide" ? err.className = "error_visible"  : null;
    err.textContent = "Wrong name format"  
  };
  return err.textContent;
};

export function checkLogin(login: string): string {
  const reg: RegExp = /^(?!\d+$)[[\w-]{3,20}$/;
  const err: HTMLElement = document.querySelector(`#error`) as HTMLElement;

  if (reg.test(login)) {
    err.className === "error_visible" ? err.className = "error_hide"  : null;
    err.textContent = "";
  } else {
    err.className === "error_hide" ? err.className = "error_visible"  : null;
    err.textContent = "Wrong login format";
  };
  return err.textContent;
};


export function checkPassword (password: string): string {
  const reg: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d-_]{8,40}$/;
  const err: HTMLElement = document.querySelector(`#error`) as HTMLElement;

  if (reg.test(password)) {
    err.className === "error_visible" ? err.className = "error_hide"  : null;
    err.textContent = "";
  } else {
    err.className === "error_hide" ? err.className = "error_visible"  : null;
    err.textContent = "Wrong password format";
  };
  return err.textContent;
};

export function checkEmail (email: string): string {
  const reg: RegExp = /^[\w-]+@{1}[a-z]+\.{1}[a-z]+$/;
  const err: HTMLElement = document.querySelector(`#error`) as HTMLElement;

  if (reg.test(email)) {
    err.className === "error_visible" ? err.className = "error_hide"  : null;
    err.textContent = "";
  } else {
    err.className === "error_hide" ? err.className = "error_visible"  : null;
    err.textContent = "Wrong email format";
  };
  return err.textContent;
};

export function checkPhone (phone: string): string {
  const reg: RegExp = /^\+?[0-9]{10,15}$/;
  const err: HTMLElement = document.querySelector(`#error`) as HTMLElement;

  if (reg.test(phone)) {
    err.className === "error_visible" ? err.className = "error_hide"  : null;
    err.textContent = "";
  } else {
    err.className === "error_hide" ? err.className = "error_visible"  : null;
    err.textContent = "Wrong phone number format";
  };
  return err.textContent;
};

export function submitLoginPage (login: string, password: string): void {
  const loginReturn: string = checkLogin(login);
  if (loginReturn !== "") {
    return;
  };

  const pwdReturn: string = checkPassword(password);
  if (pwdReturn !== "") {
    return;
  };

  location.href = "#chat"; 
};

export function submitRegPage (fname: string, sname: string, login: string, email: string, phone:string, password: string, rpassword: string): void {

  const fnameReturn: string = checkName(fname);
  if (fnameReturn !== "") {
    return;
  };

  const snameReturn: string = checkName(sname);
  if (snameReturn !== "") {
    return;
  };

  const loginReturn: string = checkLogin(login);
  if (loginReturn !== "") {
    return;
  };

  const emailReturn: string = checkEmail(email);
  if (emailReturn !== "") {
    return;
  };

  const phonereturn: string = checkPhone(phone);
  if (phonereturn !== "") {
    return;
  };

  const pwdReturn: string = checkPassword(password);
  if (pwdReturn !== "") {
    return;
  };

  const rpwdReturn: string = checkPassword(rpassword);
  if (rpwdReturn !== "") {
    return;
  };

  location.href = "#app"; 
};

export function submitSettingsPage (fname: string, sname: string, email: string, phone:string): void {

  const fnameReturn: string = checkName(fname);
  if (fnameReturn !== "") {
    return;
  };

  const snameReturn: string = checkName(sname);
  if (snameReturn !== "") {
    return;
  };

  const emailReturn: string = checkEmail(email);
  if (emailReturn !== "") {
    return;
  };

  const phonereturn: string = checkPhone(phone);
  if (phonereturn !== "") {
    return;
  };

  location.href = "#app"; 
};