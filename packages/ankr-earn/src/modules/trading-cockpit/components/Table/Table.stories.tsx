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
      <Button fullWidth color="primary" variant="outlined">
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
      <Button fullWidth color="secondary" variant="outlined">
        Exchange
      </Button>
    ),
  },
];

export const Default = (): JSX.Element => {
  return <TableComponent data={dataMockup} isLoading={false} outToken="ETH" />;
};

export const LoadingState = (): JSX.Element => {
  return <TableComponent isLoading outToken="aETHb" />;
};
