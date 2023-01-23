import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainNodesTable } from './components/ChainNodesTable';
import { Spinner } from 'uiKit/Spinner';
import { useStyles } from './ChainItemStyles';
import { ChainId } from 'domains/chains/api/chain';
import { fetchChainNodesDetail } from 'domains/chains/actions/fetchChainNodesDetail';

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
    dispatchRequest(fetchChainNodesDetail(chainId, isStandalone));
  });

  return (
    <Queries<ResponseData<typeof fetchChainNodesDetail>>
      requestActions={[fetchChainNodesDetail]}
      requestKeys={[chainId]}
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

        return (
          <ChainNodesTable
            nodesDetail={data}
            className={classNames(classes.nodes, chainId)}
          />
        );
      }}
    </Queries>
  );
};
