import { Button, Drawer } from '@mui/material';
import { LoadingButton, OverlaySpinner } from '@ankr.com/ui';
import { Chain } from '@ankr.com/chains-list';
import React from 'react';

import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { Checkbox } from 'modules/common/components/Checkbox';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectAllProjects,
  selectAllWhitelistsBlockchainsLoading,
} from 'domains/projects/store/WhitelistsSelector';

import { useChainProjectsSidebarStyles } from './useChainProjectsSidebarStyles';
import { useChainProjectsSidebar } from './hooks/useChainProjectsSidebar';
import { chainProjectItemTranslation } from './translation';
import { ChainProjectAccordion } from './components/ChainProjectAccordion';
import { useProjectSubchains } from './hooks/useProjectSubchains';
import { ChainProjectSingleItem } from './components/ChainProjectSingleItem/ChainProjectSingleItem';
import { useChainProjectsAccordionExpandedId } from './hooks/useChainProjectsAccordionExpandedId';
import { ChainProjectsSidebarHeader } from './components/ChainProjectsSidebarHeader';

interface IChainProjectsSidebarProps {
  chain: Chain;
  onCloseAddToProjectsSidebar: () => void;
  isOpenedAddToProjectsSidebar: boolean;
  subchainLabels: string[];
}

export const ChainProjectsSidebar = ({
  chain,
  isOpenedAddToProjectsSidebar,
  onCloseAddToProjectsSidebar,
  subchainLabels,
}: IChainProjectsSidebarProps) => {
  const allProjects = useAppSelector(selectAllProjects);
  const isLoadingProjects = useAppSelector(
    selectAllWhitelistsBlockchainsLoading,
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
    setSelectedSubchains,
    setExpandedId,
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
          projectsCount={allProjects.length}
        />
        {isLoadingProjects ? (
          <>
            <OverlaySpinner />
          </>
        ) : (
          <>
            {allProjects.length === 1 && (
              <ChainProjectSingleItem
                chain={chain}
                handleProjectChange={handleProjectChange}
                isLoadingAddChainsToProject={isLoadingAddChainsToProject}
                project={allProjects[0]}
                selectedProjectsSubchains={selectedSubchains}
                setSelectedSubchains={setSelectedSubchains}
                onToggleAccordion={onToggleAccordion}
                expandedId={expandedId}
              />
            )}
            {allProjects.length > 1 && (
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
                {allProjects.map(project => (
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
