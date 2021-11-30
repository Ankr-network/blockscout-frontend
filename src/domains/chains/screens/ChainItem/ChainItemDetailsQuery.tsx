import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainItem } from './ChainItem';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';

interface ChainItemProps {
  chainId: string;
  data: IChainItemDetails;
}

export const ChainItemDetailsQuery = ({ chainId, data }: ChainItemProps) => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchChainDetails(chainId, '7d'));
    dispatchRequest(fetchChainDetails(chainId, '30d'));
  });

  return (
    <Queries<
      ResponseData<typeof fetchChainDetails>,
      ResponseData<typeof fetchChainDetails>
    >
      requestActions={[fetchChainDetails, fetchChainDetails]}
      requestKeys={['7d', '30d']}
      isPreloadDisabled
    >
      {(
        { data: dataFor7d, loading: dataFor7dLoading },
        { data: dataFor30d, loading: dataFor30dLoading },
      ) => {
        const fullData = {
          ...data,
          details: {
            ...data.details,
            '30d': dataFor30d,
            '7d': dataFor7d,
          },
        };

        return (
          <ChainItem
            data={fullData}
            chainId={chainId}
            dataFor7dLoading={dataFor7dLoading}
            dataFor30dLoading={dataFor30dLoading}
          />
        );
      }}
    </Queries>
  );
};
