import React, { useCallback } from 'react';

import { DomainsForm } from './DomainsForm';
import { useLazyInfrastructureEditChainRestrictedDomainsQuery } from 'domains/infrastructure/actions/editChainRestrictedDomains';
import { DomainsFormContainerProps } from './DomainsFormTypes';

export const DomainsFormContainer = ({
  data,
  chainId,
}: DomainsFormContainerProps) => {
  const [editChainRestrictedDomains] =
    useLazyInfrastructureEditChainRestrictedDomainsQuery();
  const onSubmit = useCallback(
    async (domains: string[]) => {
      await editChainRestrictedDomains({ chainId, domains });
    },
    [editChainRestrictedDomains, chainId],
  );

  return <DomainsForm onSubmit={onSubmit} data={data} />;
};
