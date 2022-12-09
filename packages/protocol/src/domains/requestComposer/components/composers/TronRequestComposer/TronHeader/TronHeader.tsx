import React, { useEffect } from 'react';
import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest } from '@redux-requests/react';

import { ChainID } from 'modules/chains/types';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { fetchTronLastBlockNumber } from 'domains/requestComposer/actions/tron/fetchTronLastBlockNumber';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { Header } from '../../../Header';
import { BlockNumber } from '../../../Header/BlockNumber';

interface IHeaderProps {
  publicUrl?: string;
}

type FetchTronLastBlockNumberResponseData = ResponseData<
  typeof fetchTronLastBlockNumber
>;

export const TronHeader = ({ publicUrl }: IHeaderProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchTronLastBlockNumber(publicUrl));
  }, [dispatchRequest, publicUrl]);

  useOnUnmount(() => {
    dispatch(stopPolling([fetchTronLastBlockNumber.toString()]));
  });

  return (
    <Header chainName={ChainID.TRON}>
      <Queries<FetchTronLastBlockNumberResponseData>
        requestActions={[fetchTronLastBlockNumber]}
        isPreloadDisabled
      >
        {({ data, loading }) => (
          <BlockNumber<FetchTronLastBlockNumberResponseData>
            data={data}
            loading={loading}
          />
        )}
      </Queries>
    </Header>
  );
};
