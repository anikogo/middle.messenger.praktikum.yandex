export default function isEqual(a: any, b: any): boolean {

  if (typeof a !== typeof b) return false;

  if (typeof a === typeof b && typeof a !== "object") {
    return a === b ? true : false;
  }

  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (let key in a) {
    if (!b[key]) return false;
    if (typeof a[key] === "object" && a[key] !== null) {
      if (typeof b[key] !== "object" || b[key] === null) return false;
      return isEqual(a[key] , b[key]);
    }
    else {
      if (a[key] !== b[key]) {
        return false;
      }
    }
  }
  return true;
}
