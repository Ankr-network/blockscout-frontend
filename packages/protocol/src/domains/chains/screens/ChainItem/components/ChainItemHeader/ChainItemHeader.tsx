import { Chain, ChainID } from 'modules/chains/types';

import { CodeSampleWrapper } from './components/CodeSampleWrapper';
import { useChainItemHeaderStyles } from './ChainItemHeaderStyles';

interface ChainItemHeaderProps {
  chain: Chain;
  headerContent: JSX.Element;
  className?: string;
  codeSampleWrapperClassName?: string;
}

export const ChainItemHeader = ({
  chain,
  headerContent,
  className,
  codeSampleWrapperClassName,
}: ChainItemHeaderProps) => {
  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const { cx, classes } = useChainItemHeaderStyles();

  return (
    <>
      {isMultiChain ? (
        <CodeSampleWrapper
          chain={chain}
          header={headerContent}
          url={chain.urls[0].rpc}
          codeSampleWrapperClassName={codeSampleWrapperClassName}
        />
      ) : (
        <div className={cx(classes.chainItemHeader, className)}>
          {headerContent}
        </div>
      )}
    </>
  );
};
