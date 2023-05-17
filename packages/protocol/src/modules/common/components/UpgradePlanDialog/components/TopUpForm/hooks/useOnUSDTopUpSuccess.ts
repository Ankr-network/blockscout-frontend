import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ONE_TIME_PAYMENT_ID } from 'domains/account/actions/usdTopUp/fetchLinkForCardPayment';
import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';
import { TopUpOrigin, TrackTopUpSubmit } from 'domains/account/types';
import { TopUpSuccessHandler } from '../types';
import {
  selectTopUpOrigin,
  setTopUpOrigin,
} from 'domains/account/store/accountTopUpSlice';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultUSDPrice = ONE_TIME_PAYMENT_ID;

export const useOnUSDTopUpSuccess = (trackSubmit?: TrackTopUpSubmit) => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const {
    handleFetchLinkForCardPayment,
    isFetchLinkForCardPaymentLoading: isLoading,
  } = useCardPayment();

  const dispatch = useDispatch();
  const topUpOrigin = useSelector(selectTopUpOrigin);

  const onSuccess: TopUpSuccessHandler = useCallback(
    async ({ amount, usdPrice = defaultUSDPrice }) => {
      const { data: url } = await handleFetchLinkForCardPayment({
        amount,
        id: usdPrice,
        groupAddress: selectedGroupAddress,
      });

      const redirect = () => {
        if (url) {
          dispatch(setTopUpOrigin(topUpOrigin ?? TopUpOrigin.ENDPOINTS));

          window.location.href = url;
        }
      };

      if (trackSubmit) {
        trackSubmit(amount, TopUpCurrnecy.USD, redirect);
      } else {
        redirect();
      }
    },
    [
      topUpOrigin,
      dispatch,
      handleFetchLinkForCardPayment,
      trackSubmit,
      selectedGroupAddress,
    ],
  );

  return { isLoading, onSuccess };
};
