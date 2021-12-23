export const roundByStep = (v: number, step: number, offset = 0) =>
  Math.round(Math.ceil((v - offset) / step) * step * 1000) / 1000 + offset;
