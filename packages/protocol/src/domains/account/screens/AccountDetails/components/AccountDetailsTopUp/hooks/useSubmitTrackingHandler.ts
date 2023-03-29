import { useCallback } from 'react';

import { TrackTopUpSubmit } from 'domains/account/types';
import { getAmountInCredits } from '../utils/getAmountInCredits';
import { trackTopUpSubmit } from 'modules/analytics/mixpanel/trackTopUpSubmit';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useRates } from 'domains/account/hooks/useRates';

export const useSubmitTrackingHandler = (): TrackTopUpSubmit => {
  const {
    address,
    hasPremium,
    hasPrivateAccess,
    trackingWalletName: walletName,
  } = useAuth();

  const { creditBalance } = useBalance();

  const { rates } = useRates();

  return useCallback(
    (amount, currency, callback = () => {}) =>
      trackTopUpSubmit({
        address,
        amount: getAmountInCredits({ amount, currency, rates }),
        callback,
        creditBalance,
        currency,
        hasPremium,
        isNew: !hasPrivateAccess,
        walletName,
      }),
    [address, creditBalance, hasPremium, hasPrivateAccess, rates, walletName],
  );
};
