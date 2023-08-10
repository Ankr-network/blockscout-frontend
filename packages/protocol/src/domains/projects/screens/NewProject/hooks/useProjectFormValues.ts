import { useForm } from 'react-final-form';

import { Chain, ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

export const getMainnetChains = (
  previouslySelectedMainnetIds: ChainID[],
  chains?: Chain[],
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

export const getTestnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: Chain[],
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

export const getDevnetChains = (
  previouslySelectedIds: ChainID[],
  chains?: Chain[],
) =>
  chains?.filter(({ devnets }) => {
    return devnets?.some(({ id }) => previouslySelectedIds.includes(id));
  }) || [];

export const getSelectedChains = ({
  selectedMainnetChains,
  selectedTestnetChains,
  selectedDevnetChains,
}: {
  selectedMainnetChains: Chain[];
  selectedTestnetChains: Chain[];
  selectedDevnetChains: Chain[];
}) => {
  const allSelectedChains = [
    ...selectedMainnetChains,
    ...selectedTestnetChains,
    ...selectedDevnetChains,
  ];

  const selectedChains = [...new Set(allSelectedChains)];
  const initiallySelectedChainIds = selectedChains.map(({ id }) => id);

  return { selectedChains, initiallySelectedChainIds };
};

export const useProjectFormValues = (projectChains?: Chain[]) => {
  const { getState, change } = useForm();

  const {
    values: {
      projectName,
      whitelistItems = [],
      whitelistDialog,
      planName,
      planPrice,
      selectedMainnetIds = [],
      selectedTestnetIds = [],
      selectedDevnetIds = [],
    },
  } = getState();

  const allSelectedChainIds = [
    ...selectedMainnetIds,
    ...selectedTestnetIds,
    ...selectedDevnetIds,
  ];

  let selectedMainnetChains: Chain[] = [];
  let selectedTestnetChains: Chain[] = [];
  let selectedDevnetChains: Chain[] = [];

  if (projectChains) {
    selectedMainnetChains = getMainnetChains(selectedMainnetIds, projectChains);
    selectedTestnetChains = getTestnetChains(selectedTestnetIds, projectChains);
    selectedDevnetChains = getDevnetChains(selectedDevnetIds, projectChains);
  }

  const { initiallySelectedChainIds } = getSelectedChains({
    selectedMainnetChains,
    selectedTestnetChains,
    selectedDevnetChains,
  });

  return {
    projectName,
    planName,
    whitelistItems,
    whitelistDialog,
    planPrice,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    allSelectedChainIds,
    onChange: change,
    initiallySelectedChainIds,
  };
};
