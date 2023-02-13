import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { useBnbTradeInfo } from './useBnbTradeInfo';

export const BnbTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = useBnbTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
