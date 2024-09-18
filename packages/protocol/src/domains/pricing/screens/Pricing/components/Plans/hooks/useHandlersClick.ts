import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { AccountRoutesConfig } from 'domains/account/Routes';

interface UseHandlersClickArguments {
  isLoggedIn: boolean;
  onOpenSignupDialog: () => void;
  onOpenTopupDialog: () => void;
  clickCallback?: () => void;
}

export const useHandlersClick = ({
  clickCallback,
  isLoggedIn,
  onOpenSignupDialog,
  onOpenTopupDialog,
}: UseHandlersClickArguments) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const billingPageRedirect = useCallback(() => {
    if (typeof clickCallback === 'function') {
      clickCallback();
    }

    const location = AccountRoutesConfig.accountDetails.generatePath();

    history.replace(location);
  }, [history, clickCallback]);

  const chainsPageRedirect = useCallback(() => {
    if (typeof clickCallback === 'function') {
      clickCallback();
    }

    const location = ChainsRoutesConfig.chains.generatePath({ isLoggedIn });

    history.replace(location);
  }, [history, isLoggedIn, clickCallback]);

  const openTopUpDialog = useCallback(() => {
    if (typeof clickCallback === 'function') {
      clickCallback();
    }

    dispatch(setTopUpOrigin(TopUpOrigin.PRICING));

    onOpenTopupDialog();
  }, [dispatch, onOpenTopupDialog, clickCallback]);

  const openSignupDialog = useCallback(() => {
    if (typeof clickCallback === 'function') {
      clickCallback();
    }

    onOpenSignupDialog();
  }, [onOpenSignupDialog, clickCallback]);

  return {
    billingPageRedirect,
    chainsPageRedirect,
    openTopUpDialog,
    openSignupDialog,
  };
};
