import React, { useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { TopUpForm } from './TopUpForm';
import { TopUpFormValues } from './TopUpFormTypes';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const TopUpFormContainer = () => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      // eslint-disable-next-line no-console
      console.log(data);
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));
    },
    [dispatch],
  );

  return <TopUpForm onSubmit={onSubmit} />;
};
