import { useCallback } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';

import { AllNetworksSelector } from './components/AllNetworksSelector';
import { NetworkSelector } from './components/NetworkSelector';
import { NetworksSelectorTitle } from './components/NetworksSelectorTitle';
import { useNetworks } from './hooks/useNetworks';
import { useNetworksSelectorStyles } from './useNetworksSelectorStyles';

export interface NetworksSelectorProps {
  allSubchainPaths: ChainPath[];
  chain: Chain;
  handleUpdateNetworksPaths: (paths: ChainPath[]) => void;
  selectedSubchainPaths: ChainPath[];
}

export const NetworksSelector = ({
  allSubchainPaths,
  chain,
  handleUpdateNetworksPaths,
  selectedSubchainPaths,
}: NetworksSelectorProps) => {
  const { filteredNetworksWithoutTendermintRpc } = useNetworks(chain);
  const hasError = selectedSubchainPaths.length === 0;

  const { classes } = useNetworksSelectorStyles();

  const selectAllSubchainPaths = useCallback(() => {
    handleUpdateNetworksPaths(
      allSubchainPaths.filter(path => !selectedSubchainPaths.includes(path)),
    );
  }, [allSubchainPaths, handleUpdateNetworksPaths, selectedSubchainPaths]);

  const unselectAllSubchainPaths = useCallback(() => {
    handleUpdateNetworksPaths(
      allSubchainPaths.filter(path => selectedSubchainPaths.includes(path)),
    );
  }, [allSubchainPaths, handleUpdateNetworksPaths, selectedSubchainPaths]);

  return (
    <div className={classes.root}>
      <NetworksSelectorTitle className={classes.title} hasError={hasError} />
      <AllNetworksSelector
        allSubchainPaths={allSubchainPaths}
        handleSelectAllSubchains={selectAllSubchainPaths}
        handleUnselectAllSubchains={unselectAllSubchainPaths}
        selectedSubchainPaths={selectedSubchainPaths}
      />
      {filteredNetworksWithoutTendermintRpc.map(({ groups, name }) => (
        <NetworkSelector
          handleUpdateNetworksPaths={handleUpdateNetworksPaths}
          key={name}
          networkGroups={groups}
          networkName={name}
          selectedSubchainPaths={selectedSubchainPaths}
        />
      ))}
    </div>
  );
};
