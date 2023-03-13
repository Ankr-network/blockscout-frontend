import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { ChainDocsLink } from '../ChainDocsLink';
import { ChainLogo } from '../ChainLogo';
import { ChainSubtitle } from '../ChainSubtitle';
import { ChainTitle } from '../ChainTitle';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MetamaskButtonLabel } from 'domains/chains/components/MetamaskButtonLabel';
import { useChainOverviewStyles } from './ChainOverviewStyles';
import { TronAbout } from '../TronAbout';
import { ChainID } from 'modules/chains/types';

export interface ChainOverviewProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  isChainArchived: boolean;
  publicChain: IApiChain;
}

export const ChainOverview = ({
  chain,
  chainType,
  group,
  isChainArchived,
  publicChain,
}: ChainOverviewProps) => {
  const { classes } = useChainOverviewStyles();
  const { id } = chain;

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
          {publicChain && (
            <AddNetworkButton
              chainType={chainType}
              className={classes.addNetworkButton}
              group={group}
              label={<MetamaskButtonLabel />}
              publicChain={publicChain}
            />
          )}
        </div>
      </div>
      {id === ChainID.TRON && <TronAbout />}
    </div>
  );
};
