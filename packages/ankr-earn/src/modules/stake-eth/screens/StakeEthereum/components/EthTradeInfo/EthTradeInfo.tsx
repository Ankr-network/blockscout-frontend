import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { useEthTradeInfo } from './useEthTradeInfo';

export const EthTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = useEthTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
