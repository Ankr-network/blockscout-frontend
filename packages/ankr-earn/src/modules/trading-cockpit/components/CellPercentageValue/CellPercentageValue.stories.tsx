import { CellPercentageValue } from '.';

export default {
  title: 'modules/TradingCockpit/components/CellPercentageValue',
};

export const Default = () => (
  <CellPercentageValue value={0} text="Fair value" />
);

export const PositivePercentage = () => <CellPercentageValue value={20} />;
export const NegativePercentage = () => <CellPercentageValue value={-33} />;
