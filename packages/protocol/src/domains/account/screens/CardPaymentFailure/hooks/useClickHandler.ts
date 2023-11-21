import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';

export const useClickHandler = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
  }, [dispatch]);
};
