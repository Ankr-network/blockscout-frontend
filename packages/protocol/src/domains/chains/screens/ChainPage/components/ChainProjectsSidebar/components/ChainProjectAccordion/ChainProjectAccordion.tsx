import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';
import { Chain, ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';

import { Checkbox } from 'modules/common/components/Checkbox';
import { SubchainSelectors } from 'domains/projects/components/ChainCellWithSubchains/SubchainSelectors';
import { mapProjectChains } from 'domains/projects/screens/NewProject/hooks/useProjectChains';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { Project } from 'domains/projects/utils/getAllProjects';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { chainProjectItemTranslation } from '../../translation';
import { IProjectSubchains } from '../../hooks/useProjectSubchains';
import { useChainProjectAccordionStyles } from './useChainProjectAccordionStyles';
import { useChainProjectAccordion } from './useChainProjectAccordion';

export interface IChainProjectAccordionProps {
  chain: Chain;
  handleProjectChange: (projectToken: string) => void;
  isLoadingAddChainsToProject: boolean;
  project: Project;
  selectedProjectsSubchains: IProjectSubchains;
  setSelectedSubchains: (
    subchains: ChainPath[],
    projectToken: UserEndpointToken,
  ) => void;
  expandedId?: UserEndpointToken;
  onToggleAccordion: (token: UserEndpointToken) => void;
}

export const ChainProjectAccordion = ({
  chain,
  expandedId,
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
    onAccordionClick,
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
      <div className={classes.singleProjectItem}>
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
    );
  }

  return (
    <>
      <Accordion
        expanded={expandedId === userEndpointToken}
        className={classes.chainProjectAccordion}
      >
        <AccordionSummary
          onClick={onAccordionClick}
          expandIcon={<ArrowDown />}
          className={classes.chainProjectAccordionSummary}
        >
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
        </AccordionSummary>
        <AccordionDetails className={classes.chainProjectCellAccordionDetails}>
          <Typography variant="subtitle3" color="textSecondary">
            {t(keys.networks)}
          </Typography>
          <SubchainSelectors
            isLoading={isLoadingAddChainsToProject}
            chain={mapProjectChains(chain, true)}
            setSelectedChainPaths={setSelectedChainPaths}
            selectedChainPaths={selectedChainPaths}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
