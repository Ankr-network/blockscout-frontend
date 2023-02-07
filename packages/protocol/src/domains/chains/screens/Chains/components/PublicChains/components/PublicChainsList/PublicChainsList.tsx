import { ChainsListProps } from 'domains/chains/components/ChainsList';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/ChainsListStyles';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { PublicChainsItem } from '../PublicChainsItem';

export const PublicChainsList = ({
  timeframe,
  chains,
  chainsDictionary,
}: ChainsListProps) => {
  const { classes } = useChainListStyles();

  return (
    <div className={classes.root}>
      {excludeMultiChain(chains).map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <PublicChainsItem
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
