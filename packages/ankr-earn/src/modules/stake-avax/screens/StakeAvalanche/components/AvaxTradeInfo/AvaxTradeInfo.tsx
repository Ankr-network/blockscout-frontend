import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { useAvaxTradeInfo } from './useAvaxTradeInfo';

export const AvaxTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = useAvaxTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
