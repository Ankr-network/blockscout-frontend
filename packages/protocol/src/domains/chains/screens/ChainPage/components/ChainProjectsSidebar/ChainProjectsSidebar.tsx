import { Button, Drawer } from '@mui/material';
import { LoadingButton, OverlaySpinner } from '@ankr.com/ui';
import { Chain } from '@ankr.com/chains-list';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { Checkbox } from 'modules/common/components/Checkbox';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { IProjectWithBlockchains } from 'domains/projects/types';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectCurrentProjectsWhitelistsBlockchainsLoading } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainProjectAccordion } from './components/ChainProjectAccordion';
import { ChainProjectSingleItem } from './components/ChainProjectSingleItem/ChainProjectSingleItem';
import { ChainProjectsSidebarHeader } from './components/ChainProjectsSidebarHeader';
import { chainProjectItemTranslation } from './translation';
import { useChainProjectsAccordionExpandedId } from './hooks/useChainProjectsAccordionExpandedId';
import { useChainProjectsSidebar } from './hooks/useChainProjectsSidebar';
import { useChainProjectsSidebarStyles } from './useChainProjectsSidebarStyles';
import { useProjectSubchains } from './hooks/useProjectSubchains';

interface IChainProjectsSidebarProps {
  chain: Chain;
  isOpenedAddToProjectsSidebar: boolean;
  jwts: JWT[];
  onCloseAddToProjectsSidebar: () => void;
  projectsWithBlockchains: IProjectWithBlockchains[];
  subchainLabels: string[];
}

export const ChainProjectsSidebar = ({
  chain,
  isOpenedAddToProjectsSidebar,
  jwts: projects,
  onCloseAddToProjectsSidebar,
  subchainLabels,
}: IChainProjectsSidebarProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const projectBlockchainsLoading = useAppSelector(state =>
    selectCurrentProjectsWhitelistsBlockchainsLoading(state, { group }),
  );

  const { selectedSubchains, setSelectedSubchains } = useProjectSubchains();

  const { expandedId, onToggleAccordion, setExpandedId } =
    useChainProjectsAccordionExpandedId();

  const {
    handleAllChange,
    handleProjectChange,
    isAllIndeterminate,
    isAllSelected,
    isLoadingAddChainsToProject,
    onConfirm,
  } = useChainProjectsSidebar({
    chain,
    onCloseAddToProjectsSidebar,
    selectedSubchains,
    setExpandedId,
    setSelectedSubchains,
  });

  const { classes } = useChainProjectsSidebarStyles();

  const { keys, t } = useTranslation(chainProjectItemTranslation);

  return (
    <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
      <Drawer
        anchor="right"
        onClose={onCloseAddToProjectsSidebar}
        open={isOpenedAddToProjectsSidebar}
        classes={{
          paper: classes.addToProjectsDialogPaper,
        }}
      >
        <ChainProjectsSidebarHeader
          chain={chain}
          subchainLabels={subchainLabels}
          onCloseAddToProjectsSidebar={onCloseAddToProjectsSidebar}
          projectsCount={projects.length}
        />
        {projectBlockchainsLoading ? (
          <>
            <OverlaySpinner />
          </>
        ) : (
          <>
            {projects.length === 1 && (
              <ChainProjectSingleItem
                chain={chain}
                handleProjectChange={handleProjectChange}
                isLoadingAddChainsToProject={isLoadingAddChainsToProject}
                project={projects[0]}
                selectedProjectsSubchains={selectedSubchains}
                setSelectedSubchains={setSelectedSubchains}
                onToggleAccordion={onToggleAccordion}
                expandedId={expandedId}
              />
            )}
            {projects.length > 1 && (
              <>
                <Checkbox
                  isDisabled={isLoadingAddChainsToProject}
                  hasBorderBottom
                  hasPadding
                  isChecked={isAllSelected}
                  isIndeterminate={isAllIndeterminate}
                  label={t(keys.selectAll)}
                  onChange={handleAllChange}
                  classNameRoot={classes.selectAllCheckbox}
                />
                {projects.map(project => (
                  <ChainProjectAccordion
                    key={project.userEndpointToken}
                    chain={chain}
                    handleProjectChange={handleProjectChange}
                    isLoadingAddChainsToProject={isLoadingAddChainsToProject}
                    project={project}
                    selectedProjectsSubchains={selectedSubchains}
                    setSelectedSubchains={setSelectedSubchains}
                    onToggleAccordion={onToggleAccordion}
                    expandedId={expandedId}
                  />
                ))}
              </>
            )}
          </>
        )}

        <div className={classes.chainProjectsActions}>
          <LoadingButton
            size="large"
            fullWidth
            onClick={onConfirm}
            loading={isLoadingAddChainsToProject}
            disabled={isLoadingAddChainsToProject}
          >
            {t(keys.confirm)}
          </LoadingButton>
          <Button
            size="large"
            fullWidth
            variant="outlined"
            onClick={onCloseAddToProjectsSidebar}
          >
            {t(keys.cancel)}
          </Button>
        </div>
      </Drawer>
    </GuardUserGroup>
  );
};
