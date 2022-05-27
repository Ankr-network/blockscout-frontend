import React, { useMemo } from 'react';

import { useStyles } from './ChainItemStyles';
import { ChainItemHeader } from './components/ChainItemHeader';
import { useChainItemBreadcrumbs } from './useChainItem';
import { IChainItemDetails } from '../../actions/fetchChain';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { H1Tag } from 'uiKit/H1Tag';
import { getChainName } from 'uiKit/utils/useMetatags';
import { t } from 'common';
import { ChainItemTabs } from './components/ChainItemTabs';
import { ChainBanner } from './components/ChainBanner';

interface IChainItemUIProps {
  data: IChainItemDetails;
  chainId: string;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const { credentials, loading: authLoading, isWalletConnected } = useAuth();

  const classes = useStyles();

  useChainItemBreadcrumbs(data.chain.name, isWalletConnected);

  const { chain, nodes } = data;

  const name = useMemo(() => getChainName(chainId), [chainId]);

  return (
    <div className={classes.chainDetailsWrapper}>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader
        chain={chain}
        hasCredentials={Boolean(credentials)}
        icon={chain.icon}
        nodes={nodes}
        loading={authLoading}
      />

      {!isWalletConnected && !authLoading && (
        <ChainBanner className={classes.chainBanner} />
      )}
      <ChainItemTabs chainId={chainId} data={data} />
    </div>
  );
};
