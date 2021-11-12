import React from 'react';
import { useStyles } from './ChainItemStyles';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { RequestsMap } from './components/RequestsMap';
import { useIsWXGAPlusDown } from 'modules/themes/useTheme';
import { useChainItem } from './useChainItem';
import { IChainItemDetails } from '../../actions/fetchChain';
import { useAuth } from '../../../../modules/auth/hooks/useAuth';

interface IChainItemUIProps {
  data: IChainItemDetails;
  chainId: string;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const isWXGAPlusDown = useIsWXGAPlusDown();
  const { credentials } = useAuth();
  const {
    totalCached,
    totalRequests,
    timeframe,
    chain,
    totalRequestsCount,
    totalRequestsHistory,
    handleTimeframeClick,
    countries,
  } = useChainItem(data);
  const classes = useStyles();

  const detailsBlock = (
    <ChainItemDetails
      className={classes.chainItemDetails}
      totalCached={totalCached}
      totalRequests={totalRequests}
      timeframe={timeframe}
    />
  );

  return (
    <>
      <div className={classes.chainDetailsWrapper}>
        <ChainItemHeader
          className={classes.chainItemHeader}
          chain={chain}
          chainId={chainId}
          hasCredentials={Boolean(credentials)}
          icon={chain.icon}
        />
        {isWXGAPlusDown && detailsBlock}
        <ChainRequestsOverview
          className={classes.chainRequestsOverview}
          totalRequests={totalRequestsCount}
          totalRequestsHistory={totalRequestsHistory}
          onClick={handleTimeframeClick}
          timeframe={timeframe}
        />
        {Object.keys(countries).length !== 0 && (
          <RequestsMap countries={countries} />
        )}
      </div>
      {!isWXGAPlusDown && detailsBlock}
    </>
  );
};
