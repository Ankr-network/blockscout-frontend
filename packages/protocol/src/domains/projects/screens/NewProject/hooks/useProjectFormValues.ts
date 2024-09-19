import { useForm } from 'react-final-form';
import { t } from '@ankr.com/common';
import { Chain, ChainID } from '@ankr.com/chains-list';

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
  selectedDevnetChains,
  selectedMainnetChains,
  selectedTestnetChains,
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

// TODO: remove it. it's duplicate of another one useProjectFormValues in common hooks folder
// https://ankrnetwork.atlassian.net/browse/MRPC-3652
export const useProjectFormValues = (projectChains?: Chain[]) => {
  const { change, getState } = useForm<NewProjectFormValues>();

  const {
    valid,
    values: {
      indexOfEditingWhitelistItem = undefined,
      isEditingWhitelistDialog = false,
      isSelectedAll = false,
      planName,
      planPrice,
      projectName = t('projects.new-project.project-name-fallback'),
      selectedDevnetIds = [],
      selectedMainnetIds = [],
      selectedTestnetIds = [],
      shouldSkipFormReset = false,
      whitelistDialog = initialDialogValues,
      whitelistItems = [],
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
    isSelectedAll,
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
    isValid: valid,
  };
};
