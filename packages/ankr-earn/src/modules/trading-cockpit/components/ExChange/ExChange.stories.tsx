import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';

import { ExChange } from '.';

export const Default = (): JSX.Element => {
  return <ExChange iconSlot={<AETHCIcon />} title="StakeFi" />;
};

export default {
  title: 'modules/TradingCockpit/components/ExChange',
};
