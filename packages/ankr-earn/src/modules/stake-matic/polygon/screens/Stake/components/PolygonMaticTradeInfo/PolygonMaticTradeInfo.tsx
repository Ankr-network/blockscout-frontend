import { TradeInfo } from 'modules/stake/components/TradeInfo';

import { usePolygonMaticTradeInfo } from './usePolygonMaticTradeInfo';

export const PolygonMaticTradeInfo = (): JSX.Element => {
  const { discountPct, link, token, onLinkClick } = usePolygonMaticTradeInfo();

  return (
    <TradeInfo
      discountPct={discountPct}
      link={link}
      token={token}
      onLinkClick={onLinkClick}
    />
  );
};
