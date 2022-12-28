import { ChainsItemQuery } from '../ChainsItem/ChainsItemQuery';
import { ChainsListProps } from './ChainsListTypes';
import { PERIOD } from './ChainsListUtils';
import { useChainListStyles } from './ChainsListStyles';
import { useChains } from './hooks/useChains';

export const ChainsList = ({
  allChains,
  chains,
  isMMIndex,
  sortType,
  timeframe,
}: ChainsListProps) => {
  const classes = useChainListStyles();

  const { processedChains, publicChainsMap } = useChains({
    allChains,
    chains,
    sortType,
  });

  return (
    <div className={classes.root}>
      {processedChains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItemQuery
              chain={item}
              chainId={id}
              isMMIndex={isMMIndex}
              links={urls}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              publicChain={publicChainsMap[id]}
              timeframe={timeframe}
            />
          </div>
        );
      })}
    </div>
  );
};
