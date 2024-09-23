import { useForm } from 'react-final-form';
import { ChainID } from '@ankr.com/chains-list';

import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { ProjectChainsType } from 'domains/projects/types';

import { NewProjectFormValues } from '../screens/NewProject/components/NewProjectForm/NewProjectFormTypes';

const getMainnetChains = (
  previouslySelectedMainnetIds: ChainID[],
  chains?: ProjectChainsType[],
) => {
  if (!chains) {
    return [];
  }

  const selectedMainnetChains = chains.filter(({ id }) =>
    previouslySelectedMainnetIds.includes(id),
  );

  const selectedMainnetExtensions = chains.filter(({ extensions = [] }) =>
    extensions.some(extension =>
      previouslySelectedMainnetIds.includes(extension.id),
    ),
  );

  return [...selectedMainnetChains, ...selectedMainnetExtensions];
};

const getTestnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ id, testnets }) => {
    // zetachain is testnet only but has custom config that includes mainnet.
    // so we have to ignore isTestnetOnlyChain condition
    // and use common case for this chain to get testnet chains
    if (isTestnetOnlyChain(id) && id !== ChainID.ZETACHAIN) {
      return previouslySelectedIds.includes(id);
    }

    return testnets?.some(({ id: testnetId }) =>
      previouslySelectedIds.includes(testnetId),
    );
  }) || [];

const getDevnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ devnets }) => {
    return devnets?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

const getBeaconsMainnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ beacons }) => {
    return beacons?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

const getOpnodesMainnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ opnodes }) => {
    return opnodes?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

const getBeaconTestnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ beaconsTestnet }) => {
    return beaconsTestnet?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

const getOpnodeTestnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: ProjectChainsType[],
) =>
  chains?.filter(({ opnodesTestnet }) => {
    return opnodesTestnet?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

export const getSelectedChains = ({
  selectedBeaconMainnetChains,
  selectedBeaconTestnetChains,
  selectedDevnetChains,
  selectedMainnetChains,
  selectedOpnodeMainnetChains,
  selectedOpnodeTestnetChains,
  selectedTestnetChains,
}: {
  selectedMainnetChains: ProjectChainsType[];
  selectedTestnetChains: ProjectChainsType[];
  selectedDevnetChains: ProjectChainsType[];
  selectedBeaconMainnetChains: ProjectChainsType[];
  selectedBeaconTestnetChains: ProjectChainsType[];
  selectedOpnodeMainnetChains: ProjectChainsType[];
  selectedOpnodeTestnetChains: ProjectChainsType[];
}) => {
  const allSelectedChains = [
    ...selectedMainnetChains,
    ...selectedTestnetChains,
    ...selectedDevnetChains,
    ...selectedBeaconMainnetChains,
    ...selectedBeaconTestnetChains,
    ...selectedOpnodeMainnetChains,
    ...selectedOpnodeTestnetChains,
  ];

  const selectedChains = [...new Set(allSelectedChains)];
  const initiallySelectedChainIds = selectedChains.map(({ id }) => id);

  return { selectedChains, initiallySelectedChainIds };
};

export const useProjectFormValues = (projectChains?: ProjectChainsType[]) => {
  const { change, getState } = useForm<NewProjectFormValues>();

  const {
    valid,
    values: {
      isSelectedAll,
      planName,
      planPrice,
      projectName,
      selectedBeaconMainnetIds = [],
      selectedBeaconTestnetIds = [],
      selectedDevnetIds = [],
      selectedMainnetIds = [],
      selectedOpnodeMainnetIds = [],
      selectedOpnodeTestnetIds = [],
      selectedTestnetIds = [],
      tokenIndex,
      whitelistDialog,
      whitelistItems = [],
    },
  } = getState();

  const allSelectedChainIds: ChainID[] = [
    ...selectedMainnetIds,
    ...selectedTestnetIds,
    ...selectedDevnetIds,
    ...selectedBeaconMainnetIds,
    ...selectedBeaconTestnetIds,
    ...selectedOpnodeMainnetIds,
    ...selectedOpnodeTestnetIds,
  ];

  let selectedMainnetChains: ProjectChainsType[] = [];
  let selectedTestnetChains: ProjectChainsType[] = [];
  let selectedDevnetChains: ProjectChainsType[] = [];
  let selectedBeaconMainnetChains: ProjectChainsType[] = [];
  let selectedBeaconTestnetChains: ProjectChainsType[] = [];
  let selectedOpnodeMainnetChains: ProjectChainsType[] = [];
  let selectedOpnodeTestnetChains: ProjectChainsType[] = [];

  if (projectChains) {
    selectedMainnetChains = getMainnetChains(selectedMainnetIds, projectChains);
    selectedTestnetChains = getTestnetChains(selectedTestnetIds, projectChains);
    selectedDevnetChains = getDevnetChains(selectedDevnetIds, projectChains);
    selectedBeaconMainnetChains = getBeaconsMainnetChains(
      selectedBeaconMainnetIds,
      projectChains,
    );
    selectedBeaconTestnetChains = getBeaconTestnetChains(
      selectedBeaconTestnetIds,
      projectChains,
    );
    selectedOpnodeMainnetChains = getOpnodesMainnetChains(
      selectedOpnodeMainnetIds,
      projectChains,
    );
    selectedOpnodeTestnetChains = getOpnodeTestnetChains(
      selectedOpnodeTestnetIds,
      projectChains,
    );
  }

  const { initiallySelectedChainIds } = getSelectedChains({
    selectedMainnetChains,
    selectedTestnetChains,
    selectedDevnetChains,
    selectedBeaconMainnetChains,
    selectedBeaconTestnetChains,
    selectedOpnodeMainnetChains,
    selectedOpnodeTestnetChains,
  });

  return {
    projectName,
    tokenIndex,
    planName,
    whitelistItems,
    whitelistDialog,
    planPrice,
    isSelectedAll,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
    allSelectedChainIds,
    onChange: change,
    initiallySelectedChainIds,
    isValid: valid,
  };
};
