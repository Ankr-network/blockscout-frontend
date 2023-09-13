import { Chain, ChainID } from 'domains/chains/types';

import { CodeSampleWrapper } from './components/CodeSampleWrapper';
import { useChainItemHeaderStyles } from './ChainItemHeaderStyles';

interface ChainItemHeaderProps {
  chain: Chain;
  headerContent: JSX.Element;
}

export const ChainItemHeader = ({
  chain,
  headerContent,
}: ChainItemHeaderProps) => {
  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const { classes } = useChainItemHeaderStyles();

  return (
    <>
      {isMultiChain ? (
        <CodeSampleWrapper
          chain={chain}
          header={headerContent}
          url={chain.urls[0].rpc}
        />
      ) : (
        <div className={classes.chainItemHeader}>{headerContent}</div>
      )}
    </>
  );
};
