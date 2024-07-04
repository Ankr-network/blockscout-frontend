import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';

import { NetworksButton } from '../NetworksButton';
import { useProjectChain } from './hooks/useProjectChain';
import { useProjectChainDetails } from './hooks/useProjectChainDetails';
import { useProjectChainDetailsStyles } from './useProjectEndpointsStyles';

interface IProjectChainDetailsProps {
  isCompactView?: boolean;
  onOpenCodeExample?: () => void;
}

export const ProjectChainDetails = ({
  isCompactView,
  onOpenCodeExample,
}: IProjectChainDetailsProps) => {
  const { projectChain } = useProjectChain();

  const { chainProtocolContext, headerContent, privateChain } =
    useProjectChainDetails({
      networksButton: <NetworksButton />,
      projectChain,
      isCompactView,
      onOpenCodeExample,
    });

  const { classes, cx } = useProjectChainDetailsStyles();

  return (
    <div className={classes.root}>
      <ChainProtocolContext.Provider value={chainProtocolContext}>
        <ChainItemHeader
          chain={privateChain}
          headerContent={headerContent}
          className={cx(classes.header, { [classes.noPadding]: isCompactView })}
          codeSampleWrapperClassName={classes.codeSampleWrapper}
        />
      </ChainProtocolContext.Provider>
    </div>
  );
};
