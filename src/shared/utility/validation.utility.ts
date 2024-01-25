export function isNullorUndefined<Type>(value: Type): boolean {
  if (value === undefined) {
    return true;
  }
  if (value === null) {
    return true;
  }
  return false;
}
