import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { useEthMaticTradeInfo } from './useEthMaticTradeInfo';

export const EthMaticTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = useEthMaticTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
