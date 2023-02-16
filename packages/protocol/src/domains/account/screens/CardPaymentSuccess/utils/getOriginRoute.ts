import { AccountRoutesConfig } from 'domains/account/Routes';
import { BaseRoute } from 'modules/router/utils/createRouteConfig';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUpOrigin } from 'domains/account/types';

const topUpOriginRoutesMap: Record<TopUpOrigin, BaseRoute> = {
  [TopUpOrigin.BILLING]: AccountRoutesConfig.accountDetails,
  [TopUpOrigin.ENDPOINTS]: ChainsRoutesConfig.chains,
  [TopUpOrigin.PRICING]: PricingRoutesConfig.pricing,
};

export const getOriginRoute = (topUpOrigin?: TopUpOrigin) =>
  topUpOrigin ? topUpOriginRoutesMap[topUpOrigin] : undefined;
