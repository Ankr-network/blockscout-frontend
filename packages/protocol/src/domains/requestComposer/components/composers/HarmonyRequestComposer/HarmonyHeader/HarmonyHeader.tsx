import React, { useEffect } from 'react';
import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { fetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { Header } from '../../../Header';
import { BlockNumber } from '../../../Header/BlockNumber';

interface IHeaderProps {
  publicUrl?: string;
  chainName?: string;
}

type FetchLastBlockNumberResponseData = ResponseData<
  typeof fetchLastBlockNumber
>;

export const HarmonyHeader = ({ publicUrl, chainName }: IHeaderProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchLastBlockNumber(publicUrl));
  }, [dispatchRequest, publicUrl]);

  useOnUnmount(() => {
    dispatch(stopPolling([fetchLastBlockNumber.toString()]));
  });

  return (
    <Header chainName={chainName}>
      <Queries<FetchLastBlockNumberResponseData>
        requestActions={[fetchLastBlockNumber]}
        isPreloadDisabled
      >
        {({ data, loading }) => (
          <BlockNumber<FetchLastBlockNumberResponseData>
            data={data}
            loading={loading}
          />
        )}
      </Queries>
    </Header>
  );
};
