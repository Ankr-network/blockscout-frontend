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

export const FairValueExample = () => {
  return (
    <FairValue
      tooltip={fairValueCurrenciesMockup.tooltip}
      currencyFirst={fairValueCurrenciesMockup.currencyFirst}
      currencySecond={fairValueCurrenciesMockup.currencySecond}
    />
  );
};

export default {
  title: 'modules/TradingCockpit/components/FairValue',
};
