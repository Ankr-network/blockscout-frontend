import React, { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { IpsForm } from './IpsForm';
import { editChainRestrictedIps } from 'domains/infrastructure/actions/editChainRestrictedIps';
import { IpsFormContainerProps } from './IpsFormTypes';

export const IpsFormContainer = ({ data, chainId }: IpsFormContainerProps) => {
  const dispatchRequest = useDispatchRequest();

  const onSubmit = useCallback(
    async (domains: string[]) => {
      await dispatchRequest(editChainRestrictedIps(chainId, domains));
    },
    [dispatchRequest, chainId],
  );

  return <IpsForm onSubmit={onSubmit} data={data} />;
};
