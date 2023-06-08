export type ParsedDays = [number, Period, Quantifier];

export enum Period {
  DAY,
  MONTH,
  YEAR,
}

export enum Quantifier {
  APPROXIMATELY,
  MORE,
}
