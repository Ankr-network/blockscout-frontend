import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { getPairedToken } from 'modules/trading-cockpit/utils/getPairedToken';

const defaultFormState = {
  amount: '1',
  fromToken: AvailableTokens.aETHb,
  toToken: AvailableTokens.ETH,
};

const getIsTokenValid = (token?: string): boolean => {
  return token
    ? Object.values(AvailableTokens).includes(token as AvailableTokens)
    : false;
};

interface IUseDefaultFormState {
  defaultAmount: string;
  defaultFromToken: AvailableTokens;
  defaultToToken: AvailableTokens;
}

export const useDefaultFormState = (): IUseDefaultFormState => {
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
