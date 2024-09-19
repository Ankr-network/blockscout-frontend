import React, { useCallback } from 'react';

import { useLazyInfrastructureEditChainRestrictedDomainsQuery } from 'domains/infrastructure/actions/editChainRestrictedDomains';

import { DomainsForm } from './DomainsForm';
import { DomainsFormContainerProps } from './DomainsFormTypes';

export const DomainsFormContainer = ({
  chainId,
  data,
  jwtToken,
}: DomainsFormContainerProps) => {
  const [editChainRestrictedDomains] =
    useLazyInfrastructureEditChainRestrictedDomainsQuery();
  const onSubmit = useCallback(
    async (domains: string[]) => {
      await editChainRestrictedDomains({ chainId, domains, jwtToken });
    },
    [editChainRestrictedDomains, chainId, jwtToken],
  );

  return <DomainsForm onSubmit={onSubmit} data={data} />;
};
