import React, { useCallback, useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchChainTotalRequests } from 'domains/chains/actions/fetchChainTotalRequests';
import { t } from 'modules/i18n/utils/intl';
import { ChainsItem } from '../ChainsItem';
import { useChainListStyles } from './ChainsListStyles';
import { calcuateTotalRequest, formatChains, PERIOD } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';
import { formatNumber } from 'domains/chains/screens/ChainItem/components/ChainItemDetails/ChainItemDetailsUtils';

export const ChainsList = ({
  outLoading,
  data,
  handleChainInfo,
}: ChainsListProps) => {
  const classes = useChainListStyles();
  const chains = formatChains(data);

  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (outLoading) {
      dispatchRequest(fetchChainTotalRequests());
    }
  }, [outLoading, dispatchRequest]);

  const { loading, data: chainInfo } = useQuery({
    type: fetchChainTotalRequests.toString(),
    action: fetchChainTotalRequests,
  });

  useEffect(() => {
    const allRequsts = calcuateTotalRequest(chainInfo);
    handleChainInfo(formatNumber(allRequsts), loading);
  }, [loading, chainInfo, handleChainInfo]);

  const getTotalRequest = useCallback(
    (id: string): string =>
      chainInfo?.find(item => item.chainId === id)?.totalRequests.toString() ??
      '',
    [chainInfo],
  );

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, requests, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItem
              totalRequests={getTotalRequest(id)}
              isLoading={loading}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              links={urls}
              description={
                requests ? t('chains.requests', { value: requests }) : ''
              }
              chain={item}
            />
          </div>
        );
      })}
    </div>
  );
};
