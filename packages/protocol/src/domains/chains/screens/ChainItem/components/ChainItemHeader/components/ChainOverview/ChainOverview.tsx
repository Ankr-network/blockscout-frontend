import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain, ChainID, ChainSubType, ChainType } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { TRON_RESET_API_GROUP_ID } from 'domains/auth/components/AddNetwork/const';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';

import { ChainDocsLink } from '../ChainDocsLink';
import { ChainLogo } from '../ChainLogo';
import { useChainOverviewStyles } from './ChainOverviewStyles';

export interface ChainOverviewProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  isChainArchived: boolean;
  isEnterprise: boolean;
  isMetamaskButtonHidden?: boolean;
}

export const ChainOverview = ({
  chain,
  chainType,
  chainSubType,
  group,
  isChainArchived,
  isEnterprise,
  isMetamaskButtonHidden,
}: ChainOverviewProps) => {
  const { classes } = useChainOverviewStyles();
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const isTronRestApi = useMemo(
    () => chain.id === ChainID.TRON && group.id === TRON_RESET_API_GROUP_ID,
    [chain, group],
  );

  const { name, coinName, id } = chain;

  const hasMetamaskButton =
    chain &&
    !isChainProtocolSwitchEnabled &&
    !isTronRestApi &&
    !isMetamaskButtonHidden;

  return (
    <div>
      <div className={classes.chainOverview}>
        <div className={classes.left}>
          <ChainLogo chain={chain} />
          <div className={classes.description}>
            <h1 className={classes.top}>
              <Typography variant="subtitle2" color="textPrimary">
                {name}
              </Typography>
              <ChainRequestsLabel
                descriptionClassName={classes.coinName}
                description={coinName}
                descriptionColor="textSecondary"
              />
            </h1>

            {isChainArchived && (
              <ChainLabel
                label={t('chains.archive')}
                labelClassName={classes.archiveLabel}
                tooltip={tHTML('chains.archive-tooltip-text')}
              />
            )}
          </div>
        </div>
        <div className={classes.right}>
          <ChainDocsLink id={id} size="small" className={classes.docsLink} />
          {hasMetamaskButton && (
            <AddNetworkButton
              chainType={chainType}
              chainSubType={chainSubType}
              className={classes.addNetworkButton}
              group={group}
              chain={chain}
              isEnterprise={isEnterprise}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
};
