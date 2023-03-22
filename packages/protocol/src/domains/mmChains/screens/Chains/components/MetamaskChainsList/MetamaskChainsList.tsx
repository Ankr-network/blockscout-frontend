import { ChainsListProps } from 'domains/chains/components/ChainsList/ChainsListTypes';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { MetamaskChainsItem } from '../MetamaskChainsItem';

export const MetamaskChainsList = ({
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
            <MetamaskChainsItem
              chain={item}
              links={urls}
              name={name}
              period={PERIOD}
              publicChain={chainsDictionary[id]}
              timeframe={timeframe}
              chainId={id}
            />
          </div>
        );
      })}
    </div>
  );
};
