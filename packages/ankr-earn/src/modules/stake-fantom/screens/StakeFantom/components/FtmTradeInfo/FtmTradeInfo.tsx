import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { useFtmTradeInfo } from './useFtmTradeInfo';

export const FtmTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = useFtmTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
