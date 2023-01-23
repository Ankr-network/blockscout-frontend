import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchStandaloneChainNodesData } from 'domains/chains/actions/fetchStandaloneChainNodesData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { StandaloneChainNodesTable } from './components/StandaloneChainNodesTable';
import { Spinner } from 'uiKit/Spinner';
import { useStyles } from './ChainItemStyles';
import { ChainId } from 'domains/chains/api/chain';

interface ChainItemProps {
  chainId: ChainId;
}

export const StandaloneChainNodesTableQuery = ({ chainId }: ChainItemProps) => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStyles();

  useOnMount(() => {
    dispatchRequest(fetchStandaloneChainNodesData(chainId));
  });

  return (
    <Queries<ResponseData<typeof fetchStandaloneChainNodesData>>
      requestActions={[fetchStandaloneChainNodesData]}
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
          <StandaloneChainNodesTable
            data={nodes}
            nodesWeight={nodesWeight}
            className={classNames(classes.nodes, chainId)}
          />
        );
      }}
    </Queries>
  );
};
