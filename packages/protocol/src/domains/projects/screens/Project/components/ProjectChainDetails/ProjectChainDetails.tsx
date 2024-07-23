import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';

import { NetworksButton } from '../NetworksButton';
import { useProjectChain } from './hooks/useProjectChain';
import { useProjectChainDetails } from './hooks/useProjectChainDetails';
import { useProjectChainDetailsStyles } from './useProjectEndpointsStyles';

interface IProjectChainDetailsProps {
  isCompactView?: boolean;
}

export const ProjectChainDetails = ({
  isCompactView,
}: IProjectChainDetailsProps) => {
  const { projectChain } = useProjectChain();

  const { chainProtocolContext, headerContent } = useProjectChainDetails({
    networksButton: <NetworksButton />,
    projectChain,
    isCompactView,
  });

  const { classes, cx } = useProjectChainDetailsStyles();

  return (
    <div className={classes.root}>
      <ChainProtocolContext.Provider value={chainProtocolContext}>
        <ChainItemHeader
          headerContent={headerContent}
          className={cx(classes.header, { [classes.noPadding]: isCompactView })}
        />
      </ChainProtocolContext.Provider>
    </div>
  );
};
