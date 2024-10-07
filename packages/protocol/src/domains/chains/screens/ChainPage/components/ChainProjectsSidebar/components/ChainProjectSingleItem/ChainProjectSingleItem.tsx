import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { Checkbox } from 'modules/common/components/Checkbox';
import { SubchainSelectors } from 'domains/projects/components/ChainCellWithSubchains/SubchainSelectors';
import { mapProjectChains } from 'domains/projects/screens/NewProject/hooks/useProjectChains';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import { chainProjectItemTranslation } from '../../translation';
import { useChainProjectAccordionStyles } from '../ChainProjectAccordion/useChainProjectAccordionStyles';
import { useChainProjectAccordion } from '../ChainProjectAccordion/useChainProjectAccordion';
import { IChainProjectAccordionProps } from '../ChainProjectAccordion';

export const ChainProjectSingleItem = ({
  chain,
  handleProjectChange,
  isLoadingAddChainsToProject,
  onToggleAccordion,
  project,
  selectedProjectsSubchains,
  setSelectedSubchains,
}: IChainProjectAccordionProps) => {
  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const { name, userEndpointToken } = project;

  const {
    isIndeterminate,
    isSelected,
    onProjectChange,
    selectedChainPaths,
    setSelectedChainPaths,
  } = useChainProjectAccordion({
    chain,
    handleProjectChange,
    onToggleAccordion,
    userEndpointToken,
    selectedProjectsSubchains,
    setSelectedSubchains,
  });

  const { classes } = useChainProjectAccordionStyles();

  const { keys, t } = useTranslation(chainProjectItemTranslation);

  if (allChainPaths.length === 1) {
    return (
      <Checkbox
        isDisabled={isLoadingAddChainsToProject}
        hasPadding
        isChecked={isSelected}
        isIndeterminate={isIndeterminate}
        label={name || t(keys.defaultName)}
        onChange={onProjectChange}
        classNameLabel={classes.projectLabel}
      />
    );
  }

  return (
    <>
      <div className={classes.projectItemWrapper}>
        <Checkbox
          isDisabled={isLoadingAddChainsToProject}
          hasPadding
          isChecked={isSelected}
          isIndeterminate={isIndeterminate}
          label={name || t(keys.defaultName)}
          onChange={onProjectChange}
          classNameLabel={classes.projectLabel}
        />
      </div>

      <Typography variant="subtitle3" color="textSecondary">
        {t(keys.networks)}
      </Typography>
      <SubchainSelectors
        isLoading={isLoadingAddChainsToProject}
        chain={mapProjectChains(chain, true)}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
      />
    </>
  );
};
