import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useCallback } from 'react';

import { getAETHCRatio } from 'modules/trading-cockpit/actions/getAETHCRatio';
import { getPrices } from 'modules/trading-cockpit/actions/getPrices';
import { IGetQuotePrice } from 'modules/trading-cockpit/actions/getQuotePrice';
import { AvailableTokens } from 'modules/trading-cockpit/types';

interface IUseErrorMessageArgs {
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
  amount?: number;
}

interface IUseErrorMessageData {
  hasErrors: boolean;
  isLoading: boolean;
  repeatFailedRequests: () => void;
}

export const useErrorMessage = ({
  fromToken,
  toToken,
  amount,
}: IUseErrorMessageArgs): IUseErrorMessageData => {
  const dispatchRequest = useDispatchRequest();

  const { error: aETHcRatioDataError, loading: getAETHCRatioLoading } =
    useQuery({
      type: getAETHCRatio,
    });

  const {
    data: getPricesData,
    error: getPricesError,
    loading: getPricesLoading,
  } = useQuery<IGetQuotePrice[] | null>({
    type: getPrices,
  });

  const getPricesFailed =
    (getPricesData && !getPricesData.length) || !!getPricesError;

  const repeatFailedRequests = useCallback(() => {
    if (aETHcRatioDataError && !getAETHCRatioLoading) {
      dispatchRequest(getAETHCRatio());
    }
    if (getPricesFailed && !getPricesLoading) {
      dispatchRequest(
        getPrices({
          fromToken,
          toToken,
          amount,
        }),
      );
    }
  }, [
    aETHcRatioDataError,
    amount,
    dispatchRequest,
    fromToken,
    getAETHCRatioLoading,
    getPricesFailed,
    getPricesLoading,
    toToken,
  ]);

  const hasErrors = !!aETHcRatioDataError || getPricesFailed;

  return {
    repeatFailedRequests,
    hasErrors,
    isLoading: getPricesLoading || getAETHCRatioLoading,
  };
};
