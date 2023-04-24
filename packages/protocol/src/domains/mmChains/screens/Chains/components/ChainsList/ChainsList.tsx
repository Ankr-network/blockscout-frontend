import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { ChainID, Chain, Timeframe } from 'domains/chains/types';
import { PublicChainItem } from '../PublicChains/components/PublicChainItem';
import { PrivateChainItem } from '../PrivateChains/components/PrivateChainItem';

interface ChainsListProps {
  timeframe: Timeframe;
  chains: Chain[];
  chainsDictionary: Partial<Record<ChainID, Chain>>;
  hasPremium?: boolean;
  isPublic?: boolean;
}

export const ChainsList = ({
  timeframe,
  chains,
  chainsDictionary,
  hasPremium,
  isPublic,
}: ChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, urls } = item;

        return isPublic ? (
          <div className={classes.wrapper} key={id}>
            <PublicChainItem
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
        ) : (
          <div className={classes.wrapper} key={id}>
            <PrivateChainItem
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
