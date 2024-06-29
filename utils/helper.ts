export function inValidAttribute(attribute: number): boolean {
  return !Number.isInteger(attribute) || attribute <= 0;
}
