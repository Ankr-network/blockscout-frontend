import { Button } from 'uiKit/Button';
import { ITableRow, TableComponent } from '.';

export default {
  title: 'modules/TradingCockpit/components/Table',
};

const dataMockup: ITableRow[] = [
  {
    paltform: 'StakeFi',
    iconSlot: `🍩`,
    ratio: 1,
    fairValue: 0,
    priceDiff: 0,
    youGet: '2',
    btnSlot: (
      <Button variant="outlined" color="primary" fullWidth>
        Stake now
      </Button>
    ),
  },
  {
    paltform: 'Curve',
    iconSlot: `🐔`,
    ratio: 0.3,
    fairValue: -70,
    priceDiff: 0,
    youGet: '0.6',
    btnSlot: (
      <Button variant="outlined" color="secondary" fullWidth>
        Exchange
      </Button>
    ),
  },
];

export const Default = () => {
  return <TableComponent data={dataMockup} outToken="ETH" isLoading={false} />;
};

export const LoadingState = () => {
  return <TableComponent outToken="aETHb" isLoading />;
};
