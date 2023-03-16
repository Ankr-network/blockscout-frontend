import { ChainsListProps } from 'domains/chains/components/ChainsList';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { PrivateChainsItem } from '../PrivateChainsItem';
import { NoResult } from 'domains/chains/components/ChainsList/NoResult';

export const PrivateChainsList = ({
  timeframe,
  chains,
  chainsDictionary,
}: ChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <div className={classes.root}>
      {excludeMultiChain(chains).map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <PrivateChainsItem
              chain={item}
              chainId={id}
              links={urls}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              publicChain={chainsDictionary[id]}
              timeframe={timeframe}
            />
          </div>
        );
      })}
    </div>
  );
};
