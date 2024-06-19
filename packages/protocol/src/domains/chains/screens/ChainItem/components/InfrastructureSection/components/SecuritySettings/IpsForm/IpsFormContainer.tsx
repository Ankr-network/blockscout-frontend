import React, { useCallback } from 'react';

import { useLazyInfrastructureEditChainRestrictedIpsQuery } from 'domains/infrastructure/actions/editChainRestrictedIps';

import { IpsForm } from './IpsForm';
import { IpsFormContainerProps } from './IpsFormTypes';

export const IpsFormContainer = ({
  chainId,
  data,
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
