import React, { useCallback } from 'react';

import { IpsForm } from './IpsForm';
import { useLazyInfrastructureEditChainRestrictedIpsQuery } from 'domains/infrastructure/actions/editChainRestrictedIps';
import { IpsFormContainerProps } from './IpsFormTypes';

export const IpsFormContainer = ({
  data,
  chainId,
  jwtToken,
}: IpsFormContainerProps) => {
  const [editChainRestrictedIps] =
    useLazyInfrastructureEditChainRestrictedIpsQuery();
  const onSubmit = useCallback(
    async (ips: string[]) => {
      await editChainRestrictedIps({ chainId, ips, jwtToken });
    },
    [editChainRestrictedIps, chainId, jwtToken],
  );

  return <IpsForm onSubmit={onSubmit} data={data} />;
};
