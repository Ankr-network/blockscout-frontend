const MIN_VALUE = 0.1;

export const getPercent = (value: number) => {
  const valueInPercents = value * 100;

  if (valueInPercents < MIN_VALUE) {
    return `< ${MIN_VALUE}%`;
  }

  return `${valueInPercents.toFixed(1)}%`;
};
