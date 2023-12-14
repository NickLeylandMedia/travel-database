function determineInputs(object: any) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  //iterate through values and determine types
  const typeArray = values.map((value: any) => {
    if (typeof value === "string") {
      return "string";
    }
    if (typeof value === "number") {
      return "number";
    }
    if (typeof value === "boolean") {
      return "boolean";
    }
    if (typeof value === "object") {
      return "object";
    }
  });
  //Create new array of keys with their corresponding type
  const inputs = keys.map((key: any, index: number) => {
    return { [key]: typeArray[index] };
  });
  return inputs;
}

export { determineInputs };
