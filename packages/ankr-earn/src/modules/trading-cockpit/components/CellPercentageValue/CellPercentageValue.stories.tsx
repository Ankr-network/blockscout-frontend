import { CellPercentageValue } from '.';

export default {
  title: 'modules/TradingCockpit/components/CellPercentageValue',
};

export const Default = (): JSX.Element => (
  <CellPercentageValue text="Fair value" value={0} />
);

export const PositivePercentage = (): JSX.Element => (
  <CellPercentageValue value={20} />
);
export const NegativePercentage = (): JSX.Element => (
  <CellPercentageValue value={-33} />
);
