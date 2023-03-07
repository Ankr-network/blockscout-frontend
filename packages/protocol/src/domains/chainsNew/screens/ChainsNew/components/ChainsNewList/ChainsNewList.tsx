import { Chain, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { PrivateChainCard } from '../PrivateChainCard';
import { PublicChainCard } from '../PublicChainCard';
import { useChainsNewListStyles } from './useChainsNewListStyles';

export interface IChainsNewListProps {
  timeframe: Timeframe;
  chains: Chain[];
  switchTimeframe: () => void;
  isPublic: boolean;
}

export const ChainsNewList = ({
  chains,
  isPublic,
  ...props
}: IChainsNewListProps) => {
  const { classes } = useChainsNewListStyles();

  return (
    <div className={classes.root}>
      {chains
        .filter(item => item.id !== ChainID.MULTICHAIN)
        .map(item => {
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
