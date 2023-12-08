export interface GetRelativeChangeParams {
  currentValue: number;
  previousValue: number;
}

export const getRelativeChange = ({
  currentValue,
  previousValue,
}: GetRelativeChangeParams) => {
  if (!currentValue || !previousValue) {
    return undefined;
  }

  const fraction = (currentValue - previousValue) / previousValue;

  return fraction;
};
