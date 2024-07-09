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
  className,
  codeSampleWrapperClassName,
  headerContent,
}: ChainItemHeaderProps) => {
  const isMultiChain = chain.id === ChainID.MULTICHAIN;

  const { classes, cx } = useChainItemHeaderStyles();

  return (
    <>
      {isMultiChain ? (
        <CodeSampleWrapper
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
