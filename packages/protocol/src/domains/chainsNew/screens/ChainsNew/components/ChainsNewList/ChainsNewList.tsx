import { Chain, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { ChainCard } from '../ChainCard';
import { useChainsNewListStyles } from './useChainsNewListStyles';

export interface ChainsNewListProps {
  timeframe: Timeframe;
  chains: Chain[];
  switchTimeframe: () => void;
}

export const ChainsNewList = ({
  timeframe,
  chains,
  switchTimeframe,
}: ChainsNewListProps) => {
  const { classes } = useChainsNewListStyles();

  return (
    <div className={classes.root}>
      {chains
        .filter(item => item.id !== ChainID.MULTICHAIN)
        .map(item => {
          const { id } = item;

          return (
            <ChainCard
              key={id}
              chain={item}
              timeframe={timeframe}
              switchTimeframe={switchTimeframe}
            />
          );
        })}
    </div>
  );
};
