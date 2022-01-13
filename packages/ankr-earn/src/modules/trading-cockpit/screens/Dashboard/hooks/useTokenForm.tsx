import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { getPrices } from 'modules/trading-cockpit/actions/getPrices';
import { ITokenFormValues } from 'modules/trading-cockpit/components/TokenForm/TokenForm';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useTokenSelectOptions } from './useTokenSelectOptions';

interface IUseTokenFormArgs {
  defaultAmount: string;
  defaultFromToken: AvailableTokens;
  defaultToToken: AvailableTokens;
}

export const useTokenForm = ({
  defaultAmount,
  defaultFromToken,
  defaultToToken,
}: IUseTokenFormArgs) => {
  const [fromToken, setFromToken] = useState(defaultFromToken);
  const [toToken, setToToken] = useState(defaultToToken);
  const [amount, setAmount] = useState(defaultAmount);
  const dispatchRequest = useDispatchRequest();
  const options = useTokenSelectOptions();
  const { push } = useHistory();

  const { loading } = useQuery({
    type: getPrices,
  });

  const handleSubmit = useCallback(
    (values: ITokenFormValues) => {
      setFromToken(values.fromToken as AvailableTokens);
      setToToken(values.toToken as AvailableTokens);
      setAmount(values.amount);

      push(
        BoostRoutes.tradingCockpit.generatePath(
          values.fromToken,
          values.toToken,
        ),
      );

      dispatchRequest(
        getPrices({
          fromToken: values.fromToken as AvailableTokens,
          toToken: values.toToken as AvailableTokens,
          amount: +values.amount,
        }),
      );
    },
    [dispatchRequest, push],
  );

  useInitEffect(() => {
    push(BoostRoutes.tradingCockpit.generatePath(fromToken, toToken));
    dispatchRequest(
      getPrices({
        fromToken,
        toToken,
        amount: +amount,
      }),
    );
  });

  return {
    amount,
    fromToken,
    toToken,
    options,
    isLoading: loading,
    handleSubmit,
  };
};
