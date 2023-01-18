import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodesData } from 'domains/chains/actions/fetchChainNodesData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainNodesTable } from './components/ChainNodesTable';
import { Spinner } from 'uiKit/Spinner';
import { useStyles } from './ChainItemStyles';
import { ChainId } from 'domains/chains/api/chain';

interface ChainItemProps {
  chainId: ChainId;
  isStandalone: boolean;
}

export const ChainNodesTableQuery = ({
  chainId,
  isStandalone,
}: ChainItemProps) => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStyles();

  useOnMount(() => {
    dispatchRequest(fetchChainNodesData(chainId, isStandalone));
  });

  return (
    <Queries<ResponseData<typeof fetchChainNodesData>>
      requestActions={[fetchChainNodesData]}
      isPreloadDisabled
    >
      {({ data, loading, pristine }) => {
        if ((loading && pristine) || !data) {
          return (
            <div className={classes.spinner}>
              <Spinner />
            </div>
          );
        }

        const { nodes, nodesWeight } = data;

        return (
          <ChainNodesTable
            data={nodes}
            nodesWeight={nodesWeight}
            className={classNames(classes.nodes, chainId)}
          />
        );
      }}
    </Queries>
  );
};
