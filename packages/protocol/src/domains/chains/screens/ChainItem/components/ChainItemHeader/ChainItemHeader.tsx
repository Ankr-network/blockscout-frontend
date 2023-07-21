import { ChainID } from 'domains/chains/types';

import { CodeSampleWrapper } from './components/CodeSampleWrapper';
import {
  ChainItemHeaderContent,
  ChainItemHeaderProps,
} from './ChainItemHeaderContent';
import { useChainItemHeaderStyles } from './ChainItemHeaderStyles';

export const ChainItemHeader = (props: ChainItemHeaderProps) => {
  const { chain } = props;

  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const { classes } = useChainItemHeaderStyles();

  const headerContent = (
    <ChainItemHeaderContent isMultiChain={isMultiChain} {...props} />
  );

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
