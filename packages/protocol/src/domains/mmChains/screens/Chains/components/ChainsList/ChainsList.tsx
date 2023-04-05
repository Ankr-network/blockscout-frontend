import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { ChainItem } from '../ChainItem';
import { Chain, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

interface ChainsListProps {
  timeframe: Timeframe;
  chains: Chain[];
  chainsDictionary: Partial<Record<ChainID, Chain>>;
  hasPremium?: boolean;
}

export const ChainsList = ({
  timeframe,
  chains,
  chainsDictionary,
  hasPremium,
}: ChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainItem
              chain={item}
              links={urls}
              name={name}
              period={PERIOD}
              publicChain={chainsDictionary[id]}
              timeframe={timeframe}
              chainId={id}
              hasPremiumDialog={item.premiumOnly && !hasPremium}
            />
          </div>
        );
      })}
    </div>
  );
};
