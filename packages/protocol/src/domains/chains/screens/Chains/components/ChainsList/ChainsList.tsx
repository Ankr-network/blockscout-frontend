import { ChainsItemQuery } from '../ChainsItem/ChainsItemQuery';
import { useChainListStyles } from './ChainsListStyles';
import { ChainsListProps } from './ChainsListTypes';
import { PERIOD } from './ChainsListUtils';
import { useChains } from './hooks/useChains';

export const ChainsList = ({
  isMMIndex,
  chains,
  allChains,
  sortType,
  timeframe,
}: ChainsListProps) => {
  const classes = useChainListStyles();

  const { processedChains, publicChainsMap } = useChains({
    chains,
    allChains,
    sortType,
  });

  return (
    <div className={classes.root}>
      {processedChains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItemQuery
              isMMIndex={isMMIndex}
              chain={item}
              publicChain={publicChainsMap[id]}
              chainId={id}
              links={urls}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              timeframe={timeframe}
            />
          </div>
        );
      })}
    </div>
  );
};
