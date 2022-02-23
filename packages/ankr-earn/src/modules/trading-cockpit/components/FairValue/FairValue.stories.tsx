import { FairValue } from './FairValue';

const fairValueCurrenciesMockup = {
  tooltip: 'Placeholder Tooltip',
  currencyFirst: {
    amount: '1',
    label: 'aETHb',
  },
  currencySecond: {
    amount: '1',
    label: 'ETH',
  },
};

export const FairValueExample = (): JSX.Element => {
  return (
    <FairValue
      currencyFirst={fairValueCurrenciesMockup.currencyFirst}
      currencySecond={fairValueCurrenciesMockup.currencySecond}
      tooltip={fairValueCurrenciesMockup.tooltip}
    />
  );
};

export default {
  title: 'modules/TradingCockpit/components/FairValue',
};
