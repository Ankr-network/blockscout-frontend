import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchRequest } from '@redux-requests/react';
import {
  fetchChainTotalRequests,
  IChainTotalRequests,
} from 'domains/chains/actions/fetchChainTotalRequests';
import { getQuery } from '@redux-requests/core';
import { store } from 'store';
import { formatNumber } from 'domains/chains/screens/ChainItem/components/ChainItemDetails/ChainItemDetailsUtils';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import { formatChains, PERIOD } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';
import BigNumber from 'bignumber.js';

export const ChainsList = ({ data, setTotalRequestsData }: ChainsListProps) => {
  const classes = useStyles();
  const history = useHistory();
  const chains = formatChains(data);

  const dispatchRequest = useDispatchRequest();

  const handleClick = useCallback(
    (chainId: string) => {
      const link = ChainsRoutesConfig.chainDetails.generatePath(chainId);

      history.push(link);
    },
    [history],
  );

  const { loading, data: requestData } = getQuery(store.getState(), {
    type: fetchChainTotalRequests.toString(),
  });

  useEffect(() => {
    if (!loading) {
      dispatchRequest(fetchChainTotalRequests(chains.map(item => item.id)));
    }
    // eslint-disable-next-line
  }, []);

  const queryTotalRequest = (
    id: string,
    totalRequestsData: IChainTotalRequests[],
  ) => {
    const requestItem = totalRequestsData.find(
      (item: IChainTotalRequests) => item.chainId === id,
    );
    return requestItem?.totalRequests;
  };

  useEffect(() => {
    if (requestData) {
      const allRequsts = requestData
        .map((item: IChainTotalRequests) => item.totalRequests)
        .reduce(
          (request: BigNumber, totalRequests: BigNumber) =>
            request.plus(totalRequests),
          new BigNumber(0),
        );
      setTotalRequestsData(formatNumber(allRequsts));
    }
  }, [requestData, setTotalRequestsData]);

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, requests, rpcLinks } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <Queries<ResponseData<typeof fetchChainTotalRequests>>
              requestActions={[fetchChainTotalRequests]}
            >
              {({ data: totalRequestsData }) => (
                <ChainsItem
                  logoSrc={item.icon}
                  name={name}
                  period={PERIOD}
                  links={rpcLinks}
                  onButtonClick={() => handleClick(id)}
                  description={
                    requests ? t('chains.requests', { value: requests }) : ''
                  }
                  chain={item}
                  totalRequests={formatNumber(
                    queryTotalRequest(id, totalRequestsData),
                  )}
                />
              )}
            </Queries>
          </div>
        );
      })}
    </div>
  );
};
