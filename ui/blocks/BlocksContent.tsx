import { Text, Show, Hide, Alert } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import type { SocketMessage } from 'lib/socket/types';
import type { BlockType, BlocksResponse } from 'types/api/block';

import { getResourceKey } from 'lib/api/useApiQuery';
import useIsMobile from 'lib/hooks/useIsMobile';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';
import BlocksList from 'ui/blocks/BlocksList';
import BlocksTable from 'ui/blocks/BlocksTable';
import ActionBar from 'ui/shared/ActionBar';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import Pagination from 'ui/shared/Pagination';
import type { Props as PaginationProps } from 'ui/shared/Pagination';
import SkeletonList from 'ui/shared/skeletons/SkeletonList';
import SkeletonTable from 'ui/shared/skeletons/SkeletonTable';

type QueryResult = UseQueryResult<BlocksResponse> & {
  pagination: PaginationProps;
  isPaginationVisible: boolean;
};

interface Props {
  type?: BlockType;
  query: QueryResult;
}

const BlocksContent = ({ type, query }: Props) => {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [ socketAlert, setSocketAlert ] = React.useState('');

  const handleNewBlockMessage: SocketMessage.NewBlock['handler'] = React.useCallback((payload) => {
    const queryKey = getResourceKey('blocks', { queryParams: { type } });

    queryClient.setQueryData(queryKey, (prevData: BlocksResponse | undefined) => {
      const shouldAddToList = !type || type === payload.block.type;

      if (!prevData) {
        return {
          items: shouldAddToList ? [ payload.block ] : [],
          next_page_params: null,
        };
      }
      return shouldAddToList ? { ...prevData, items: [ payload.block, ...prevData.items ] } : prevData;
    });
  }, [ queryClient, type ]);

  const handleSocketClose = React.useCallback(() => {
    setSocketAlert('Connection is lost. Please click here to load new blocks.');
  }, []);

  const handleSocketError = React.useCallback(() => {
    setSocketAlert('An error has occurred while fetching new blocks. Please click here to refresh the page.');
  }, []);

  const channel = useSocketChannel({
    topic: 'blocks:new_block',
    onSocketClose: handleSocketClose,
    onSocketError: handleSocketError,
    isDisabled: query.isLoading || query.isError || query.pagination.page !== 1,
  });
  useSocketMessage({
    channel,
    event: 'new_block',
    handler: handleNewBlockMessage,
  });

  const content = (() => {
    if (query.isLoading) {
      return (
        <>
          <Show below="lg" key="skeleton-mobile" ssr={ false }>
            <SkeletonList/>
          </Show>
          <Hide below="lg" key="skeleton-desktop" ssr={ false }>
            <SkeletonTable columns={ [ '125px', '120px', '21%', '64px', '35%', '22%', '22%' ] }/>
          </Hide>
        </>
      );
    }

    if (query.isError) {
      return <DataFetchAlert/>;
    }

    if (query.data.items.length === 0) {
      return <Text as="span">There are no blocks.</Text>;
    }

    return (
      <>
        { socketAlert && <Alert status="warning" mb={ 6 } as="a" href={ window.document.location.href }>{ socketAlert }</Alert> }
        <Show below="lg" key="content-mobile" ssr={ false }><BlocksList data={ query.data.items }/></Show>
        <Hide below="lg" key="content-desktop" ssr={ false }><BlocksTable data={ query.data.items } top={ 80 } page={ 1 }/></Hide>
      </>
    );

  })();

  return (
    <>
      { isMobile && query.isPaginationVisible && (
        <ActionBar mt={ -6 }>
          <Pagination ml="auto" { ...query.pagination }/>
        </ActionBar>
      ) }
      { content }
    </>
  );
};

export default React.memo(BlocksContent);