import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { Chain, Timeframe } from 'domains/chains/types';
import { PrivateChainCard } from '../PrivateChains/components/PrivateChainCard';
import { PublicChainCard } from '../PublicChains/components/PublicChainCard';

export interface IChainsListProps {
  timeframe: Timeframe;
  chains: Chain[];
  isPublic: boolean;
}

export const ChainsList = ({
  chains,
  isPublic,
  ...props
}: IChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id } = item;

        return isPublic ? (
          <PublicChainCard key={id} chain={item} {...props} />
        ) : (
          <PrivateChainCard key={id} chain={item} {...props} />
        );
      })}
    </div>
  );
};
