// UNUSED as of now
export function camelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function humanizeKeyFromCamelCase(key: string, toLowerCase: boolean = true) {
  if (toLowerCase) {
    return key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLocaleLowerCase();
  }
  return key.replace(/([A-Z])/g, " $1").trim();
}
