import { ChainDocsLink } from '../ChainDocsLink';
import { ChainLogo } from '../ChainLogo';
import { ChainSubtitle } from '../ChainSubtitle';
import { ChainTitle } from '../ChainTitle';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainOverviewStyles } from './ChainOverviewStyles';

export interface ChainOverviewProps {
  chain: IApiChain;
  isChainArchived: boolean;
}

export const ChainOverview = ({
  chain,
  isChainArchived,
}: ChainOverviewProps) => {
  const classes = useChainOverviewStyles();

  return (
    <div className={classes.chainOverview}>
      <div className={classes.right}>
        <ChainLogo chain={chain} />
        <div className={classes.description}>
          <ChainTitle chain={chain} />
          <ChainSubtitle chain={chain} isChainArchived={isChainArchived} />
        </div>
      </div>
      <ChainDocsLink chain={chain} className={classes.chainDocsLink} />
    </div>
  );
};
