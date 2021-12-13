import { useCellPercentageValueStyles } from './useCellPercentageValueStyles';

interface ICellFairValue {
  value: number;
  text?: string;
}

export const CellPercentageValue = ({ value, text }: ICellFairValue) => {
  const classes = useCellPercentageValueStyles();
  const sign = value > 0 ? '+' : '';
  const renderedValue = `${sign}${value}%`;

  if (text) {
    return (
      <>
        {renderedValue} <span className={classes.text}>({text})</span>
      </>
    );
  }

  return <>{renderedValue}</>;
};
