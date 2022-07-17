type StringIndexed = Record<string, any>;

function keyToString(path: any): string {
  let output = "";

  path.forEach((v: string, i: number) => {
    if (i === 0) {
      output += v;
    } else {
      output += `[${v}]`;
    };
  });

  return output;
}

function queryStringify(data: StringIndexed): string | never {

  if (typeof data !== "object" || Array.isArray(data) || data === null) throw new Error("input must be an object");

  function _stringify(path: any, obj: any): string {

    if (typeof obj !== "object") {
      return `${keyToString(path)}=${obj}`;
    }
    else {
      const accumulator: any[] = [];
      for (let key in obj) {
        accumulator.push(_stringify(path.concat([key]), obj[key]));
      };
      return accumulator.join("&");
    };

  };

  return _stringify([], data);
};

export default queryStringify;
