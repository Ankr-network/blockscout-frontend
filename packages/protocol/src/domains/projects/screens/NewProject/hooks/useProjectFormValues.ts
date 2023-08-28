import { useForm } from 'react-final-form';
import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { initialDialogValues } from 'domains/projects/store';

import { NewProjectFormValues } from '../components/NewProjectForm/NewProjectFormTypes';

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
  const { getState, change } = useForm<NewProjectFormValues>();

  const {
    values: {
      projectName = t('projects.new-project.project-name-fallback'),
      whitelistItems = [],
      whitelistDialog = initialDialogValues,
      isEditingWhitelistDialog = false,
      shouldSkipFormReset = false,
      indexOfEditingWhitelistItem = undefined,
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
  ] as ChainID[];

  let selectedMainnetChains: Chain[] = [];
  let selectedTestnetChains: Chain[] = [];
  let selectedDevnetChains: Chain[] = [];

  if (projectChains) {
    selectedMainnetChains = getMainnetChains(
      selectedMainnetIds as ChainID[],
      projectChains,
    );
    selectedTestnetChains = getTestnetChains(
      selectedTestnetIds as ChainID[],
      projectChains,
    );
    selectedDevnetChains = getDevnetChains(
      selectedDevnetIds as ChainID[],
      projectChains,
    );
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
    isEditingWhitelistDialog,
    shouldSkipFormReset,
    indexOfEditingWhitelistItem,
    planPrice,
    selectedMainnetIds: selectedMainnetIds as ChainID[],
    selectedTestnetIds: selectedTestnetIds as ChainID[],
    selectedDevnetIds: selectedDevnetIds as ChainID[],
    allSelectedChainIds,
    onChange: change,
    initiallySelectedChainIds,
  };
};
