import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TopUpOrigin, TrackTopUpSubmit } from 'domains/account/types';
import { selectTopUpOrigin } from 'domains/account/store/selectors';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';

import { TopUpSuccessHandler } from '../types';

const defaultUSDPrice = ONE_TIME_PAYMENT_ID;

export const useOnUSDTopUpSuccess = (trackSubmit?: TrackTopUpSubmit) => {
  const { handleFetchPaymentLink, isLoading } = useCardPayment();

  const dispatch = useDispatch();
  const topUpOrigin = useSelector(selectTopUpOrigin);

  const onSuccess: TopUpSuccessHandler = useCallback(
    async ({ amount, usdPrice: id = defaultUSDPrice }) => {
      const url = await handleFetchPaymentLink(amount, id);

      const redirect = () => {
        if (url) {
          dispatch(setTopUpOrigin(topUpOrigin ?? TopUpOrigin.ENDPOINTS));

          window.location.href = url;
        }
      };

      if (trackSubmit) {
        trackSubmit(amount, TopUpCurrency.USD, redirect);
      } else {
        redirect();
      }
    },
    [topUpOrigin, dispatch, handleFetchPaymentLink, trackSubmit],
  );

  return { isLoading, onSuccess };
};
