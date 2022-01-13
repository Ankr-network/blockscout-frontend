import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { getPairedToken } from 'modules/trading-cockpit/utils/getPairedToken';

const defaultFormState = {
  amount: '1',
  fromToken: AvailableTokens.aETHb,
  toToken: AvailableTokens.ETH,
};

export const useDefaultFormState = () => {
  const { fromToken: fromTokenQuery, toToken: toTokenQuery } =
    BoostRoutes.tradingCockpit.useParams();

  const isFromTokenQueryValid = getIsTokenValid(fromTokenQuery);

  const defaultFromToken = isFromTokenQueryValid
    ? (fromTokenQuery as AvailableTokens)
    : defaultFormState.fromToken;

  const defaultToToken =
    (getPairedToken(defaultFromToken, toTokenQuery) as AvailableTokens) ??
    defaultFormState.toToken;

  return {
    defaultAmount: defaultFormState.amount,
    defaultFromToken,
    defaultToToken,
  };
};

const getIsTokenValid = (token?: string): boolean => {
  if (token && Object.values(AvailableTokens).includes(token as any)) {
    return true;
  }
  return false;
};
