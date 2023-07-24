import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useCardPayment } from 'domains/account/hooks/useCardPayment';

import { TopUpFormValues } from '../USDTopUpFormTypes';

export const useOnTopUpSubmit = (
  confirmedEmail?: string,
  pendingEmail?: string,
  trackSubmit?: TrackTopUpSubmit,
) => {
  const { handleFetchPaymentLink, isLoading } = useCardPayment();

  const [showEmailBanner, setShowEmailBanner] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = useCallback(
    async (data: TopUpFormValues) => {
      const { id, amount } = data;

      dispatch(resetTopUpOrigin());

      const url = await handleFetchPaymentLink(amount, id);

      if (typeof trackSubmit === 'function') {
        trackSubmit(amount, TopUpCurrency.USD, () => {
          if (url) {
            window.location.href = url;
          }
        });
      } else if (url) {
        window.location.href = url;
      }
    },
    [dispatch, trackSubmit, handleFetchPaymentLink],
  );

  const onClose = useCallback(() => {
    setShowEmailBanner(false);
  }, []);

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      if (!confirmedEmail || pendingEmail) {
        setShowEmailBanner(true);
      } else {
        onSuccess(data);
      }
    },
    [confirmedEmail, onSuccess, pendingEmail],
  );

  return {
    onSubmit,
    isOpened: showEmailBanner,
    onClose,
    isLoading,
  };
};
