import React, { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { DomainsForm } from './DomainsForm';
import { editChainRestrictedDomains } from 'domains/infrastructure/actions/editChainRestrictedDomains';
import { DomainsFormContainerProps } from './DomainsFormTypes';

export const DomainsFormContainer = ({
  data,
  chainId,
}: DomainsFormContainerProps) => {
  const dispatchRequest = useDispatchRequest();

  const onSubmit = useCallback(
    async (domains: string[]) => {
      await dispatchRequest(editChainRestrictedDomains(chainId, domains));
    },
    [dispatchRequest, chainId],
  );

  return <DomainsForm onSubmit={onSubmit} data={data} />;
};
