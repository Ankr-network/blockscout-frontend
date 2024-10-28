type MyObject = {
  [key: string]: any;
};

export function hasOneFieldWithSpecificNameAndValue(
  obj: MyObject,
  fieldName: string,
  expectedValue: any,
): boolean {
  const keys = Object.keys(obj);

  if (keys.length === 1 && keys[0] === fieldName) {
    return obj[keys[0]] === expectedValue;
  }

  return false;
}
