import { stopPolling } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchNearLastBlockNumber } from 'domains/requestComposer/actions/near/fetchNearLastBlockNumber';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { Header } from '../../../Header';
import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainGroupID } from 'modules/endpoints/types';

interface IHeaderProps {
  publicUrl?: string;
}

type FetchNearLastBlockNumberResponseData = ResponseData<
  typeof fetchNearLastBlockNumber
>;

export const NearHeader = ({ publicUrl }: IHeaderProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchNearLastBlockNumber(publicUrl));
  }, [dispatchRequest, publicUrl]);

  useOnUnmount(() => {
    dispatch(stopPolling([fetchNearLastBlockNumber.toString()]));
  });

  return (
    <Header chainName={ChainGroupID.NEAR}>
      <Queries<FetchNearLastBlockNumberResponseData>
        requestActions={[fetchNearLastBlockNumber]}
        isPreloadDisabled
      >
        {({ data, loading }) => (
          <BlockNumber<FetchNearLastBlockNumberResponseData>
            data={data}
            loading={loading}
          />
        )}
      </Queries>
    </Header>
  );
};
