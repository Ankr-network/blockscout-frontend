import { ChainsListProps } from 'domains/chains/components/ChainsList/ChainsListTypes';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/ChainsListStyles';
import { MetamaskChainsItem } from '../MetamaskChainsItem';

export const MetamaskChainsList = ({
  timeframe,
  chains,
  chainsDictionary,
}: ChainsListProps) => {
  const { classes } = useChainListStyles();

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <MetamaskChainsItem
              chain={item}
              links={urls}
              logoSrc={item.icon}
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
