export function inValidAttribute(attribute: number): boolean {
  return !Number.isInteger(attribute) || attribute <= 0;
}
export function rollDice(): number {
  const minValue = 1,
    maxValue = 6;
  return minValue + Math.floor(Math.random() * (maxValue - minValue + 1));
}
