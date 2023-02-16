import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TopUpOrigin, TrackTopUpSubmit } from 'domains/account/types';
import { TopUpSuccessHandler } from '../types';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';

const defaultUSDPrice = ONE_TIME_PAYMENT_ID;

export const useOnUSDTopUpSuccess = (trackSubmit?: TrackTopUpSubmit) => {
  const {
    handleFetchLinkForCardPayment,
    isFetchLinkForCardPaymentLoading: isLoading,
  } = useCardPayment();

  const dispatch = useDispatch();

  const onSuccess: TopUpSuccessHandler = useCallback(
    async ({ amount, usdPrice = defaultUSDPrice }) => {
      const { data: url } = await handleFetchLinkForCardPayment(
        amount,
        usdPrice,
      );

      const redirect = () => {
        if (url) {
          dispatch(setTopUpOrigin(TopUpOrigin.ENDPOINTS));

          window.location.href = url;
        }
      };

      if (trackSubmit) {
        trackSubmit(amount, TopUpCurrnecy.USD, redirect);
      } else {
        redirect();
      }
    },
    [dispatch, handleFetchLinkForCardPayment, trackSubmit],
  );

  return { isLoading, onSuccess };
};
