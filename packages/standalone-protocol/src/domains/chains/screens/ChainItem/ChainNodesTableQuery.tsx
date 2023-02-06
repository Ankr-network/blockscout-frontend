import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainNodesTable } from './components/ChainNodesTable';
import { useStyles } from './ChainItemStyles';
import { ChainId } from 'domains/chains/api/chain';
import { fetchChainNodesDetail } from 'domains/chains/actions/fetchChainNodesDetail';
import { useSpinner } from 'modules/layout/components/AppBase/AppBaseUtils';

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

  const spinner = useSpinner(chainId);

  return (
    <Queries<ResponseData<typeof fetchChainNodesDetail>>
      requestActions={[fetchChainNodesDetail]}
      requestKeys={[chainId]}
      isPreloadDisabled
      spinner={spinner}
    >
      {({ data, loading, pristine }) => {
        if ((loading && pristine) || !data) {
          return <div className={classes.spinner}>{spinner}</div>;
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
