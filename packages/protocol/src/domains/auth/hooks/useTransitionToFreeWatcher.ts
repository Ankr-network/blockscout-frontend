import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { oauthHasDepositTransaction } from 'domains/oauth/actions/hasDepositTransaction';
import { resetOauthLoginTimestamp } from '../store/authSlice';
import {
  selectHasPremiumToFreeTransition,
  selectHasTransitionToFreeWatcher,
  selectTimeToResetTransitionToFree,
} from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from './useAuth';

const options: Options = { subscriptionOptions: { pollingInterval: 15_000 } };

export const useTransitionToFreeWatcher = () => {
  const hasPremiumToFreeTransition = useAppSelector(
    selectHasPremiumToFreeTransition,
  );
  const timeToReset = useAppSelector(selectTimeToResetTransitionToFree);

  const hasWatcher =
    useAppSelector(selectHasTransitionToFreeWatcher) &&
    hasPremiumToFreeTransition;

  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  const [trigger] = useQueryEndpoint(oauthHasDepositTransaction, options);

  useEffect(() => {
    if (isLoggedIn) {
      const { unsubscribe } = trigger(true);

      return unsubscribe;
    }

    return () => {};
  }, [isLoggedIn, trigger]);

  useEffect(() => {
    if (hasWatcher) {
      const timeoutId = setTimeout(
        () => dispatch(resetOauthLoginTimestamp()),
        timeToReset,
      );

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [dispatch, hasWatcher, timeToReset]);
};
