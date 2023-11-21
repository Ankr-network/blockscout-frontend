import { ChainItemHeader } from 'domains/chains/screens/ChainItem/components/ChainItemHeader';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';

import { ProjectConnectionSnippet } from '../ProjectConnectionSnippet';
import { NetworksButton } from '../NetworksButton';
import { useProjectChain } from './hooks/useProjectChain';
import { useProjectChainDetails } from './hooks/useProjectChainDetails';
import { useProjectChainDetailsStyles } from './useProjectEndpointsStyles';

export const ProjectChainDetails = () => {
  const { projectChain } = useProjectChain();

  const {
    chainProtocolContext,
    headerContent,
    httpCode,
    privateChain,
    setTechnology,
    technology,
    wssCode,
  } = useProjectChainDetails({
    networksButton: <NetworksButton />,
    projectChain,
  });

  const { classes } = useProjectChainDetailsStyles();

  const { group } = headerContent.props;

  return (
    <div className={classes.root}>
      <ChainProtocolContext.Provider value={chainProtocolContext}>
        <ChainItemHeader
          chain={privateChain}
          headerContent={headerContent}
          className={classes.header}
          codeSampleWrapperClassName={classes.codeSampleWrapper}
        />

        <ProjectConnectionSnippet
          hasFullWidthSnippets
          setTechnology={setTechnology}
          httpCode={httpCode}
          wssCode={wssCode}
          technology={technology}
          isHidden={!evmGroups.includes(group.id)}
        />
      </ChainProtocolContext.Provider>
    </div>
  );
};
