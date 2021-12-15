export function floor(value: number, step = 1) {
  const inv = 1.0 / step;
  return Math.floor(value * inv) / inv;
}
