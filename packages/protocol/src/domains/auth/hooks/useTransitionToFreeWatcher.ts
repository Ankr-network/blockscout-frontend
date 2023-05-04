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
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const options: Options = { subscriptionOptions: { pollingInterval: 15_000 } };

export const useTransitionToFreeWatcher = () => {
  const hasPremiumToFreeTransition = useAppSelector(
    selectHasPremiumToFreeTransition,
  );
  const timeToReset = useAppSelector(selectTimeToResetTransitionToFree);

  const hasWatcher =
    useAppSelector(selectHasTransitionToFreeWatcher) &&
    hasPremiumToFreeTransition;

  const { isDevRole } = usePermissionsAndRole();

  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  const [trigger] = useQueryEndpoint(oauthHasDepositTransaction, options);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    if (isLoggedIn && !isDevRole) {
      const { unsubscribe } = trigger({ shouldCheckVoucherTopUp: true, group });

      return unsubscribe;
    }

    return () => {};
  }, [isLoggedIn, trigger, isDevRole, group]);

  const shouldWatch = hasWatcher || !isDevRole;

  useEffect(() => {
    if (shouldWatch) {
      const timeoutId = setTimeout(
        () => dispatch(resetOauthLoginTimestamp()),
        timeToReset,
      );

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [dispatch, hasWatcher, timeToReset, shouldWatch]);
};
