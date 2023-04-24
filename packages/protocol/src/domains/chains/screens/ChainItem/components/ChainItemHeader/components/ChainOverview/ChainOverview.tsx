import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { ChainDocsLink } from '../ChainDocsLink';
import { ChainLogo } from '../ChainLogo';
import { ChainSubtitle } from '../ChainSubtitle';
import { ChainTitle } from '../ChainTitle';
import { Chain, ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { MetamaskButtonLabel } from 'domains/chains/components/MetamaskButtonLabel';
import { useChainOverviewStyles } from './ChainOverviewStyles';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

export interface ChainOverviewProps {
  chain: Chain;
  chainType: ChainType;
  group: EndpointGroup;
  isChainArchived: boolean;
}

export const ChainOverview = ({
  chain,
  chainType,
  group,
  isChainArchived,
}: ChainOverviewProps) => {
  const { classes } = useChainOverviewStyles();
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  return (
    <div>
      <div className={classes.chainOverview}>
        <div className={classes.left}>
          <ChainLogo chain={chain} />
          <div className={classes.description}>
            <ChainTitle chain={chain} />
            <ChainSubtitle chain={chain} isChainArchived={isChainArchived} />
          </div>
        </div>
        <div className={classes.right}>
          <ChainDocsLink chain={chain} />
          {chain && !isChainProtocolSwitchEnabled && (
            <AddNetworkButton
              chainType={chainType}
              className={classes.addNetworkButton}
              group={group}
              label={<MetamaskButtonLabel />}
              chain={chain}
            />
          )}
        </div>
      </div>
    </div>
  );
};
