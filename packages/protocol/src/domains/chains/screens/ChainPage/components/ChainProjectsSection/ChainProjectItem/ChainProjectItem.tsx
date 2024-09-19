import {
  Button,
  Paper,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from '@ankr.com/ui';
import React, { useMemo } from 'react';

import { ProjectStatusLabel } from 'domains/projects/components/ProjectStatusLabel';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { CopyEndpointModal } from 'modules/chains/components/CopyEndpointModal';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ProjectRequestsActivity } from 'domains/projects/screens/Projects/components/ProjectRequestsActivity';
import { CodeExampleModal } from 'modules/chains/components/CodeExampleModal';
import { ProjectStatus } from 'domains/projects/utils/getAllProjects';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';

import { useChainProjectsSectionStyles } from '../useChainProjectsSectionStyles';
import { chainProjectItemTranslation } from './translation';
import {
  IChainProjectItemProps,
  useChainProjectItem,
} from './useChainProjectItem';

// eslint-disable-next-line max-lines-per-function
export const ChainProjectItem = ({
  chain,
  isLoading,
  jwtTokens,
  name,
  onOpenAddToProjectsDialog,
  timeframe,
  userEndpointToken,
}: IChainProjectItemProps) => {
  const {
    currentChainRequestsData,
    currentProjectStatus,
    handleCloseCodeExample,
    handleGoToProject,
    handleOpenAddToProjectsDialog,
    handleOpenCodeExample,
    isCodeExampleDisabled,
    isCurrentChainIncluded,
    isOpenedCodeExample,
    projectChain,
    projectPath,
  } = useChainProjectItem({
    chain,
    timeframe,
    userEndpointToken,
    jwtTokens,
    onOpenAddToProjectsDialog,
  });

  const { classes, cx } = useChainProjectsSectionStyles();

  const { keys, t } = useTranslation(chainProjectItemTranslation);

  const shouldUseMobileLayout = useIsSMDown();

  const projectStatus = useMemo(() => {
    if (isLoading || !currentProjectStatus) {
      return <Skeleton width={50} />;
    }

    return <ProjectStatusLabel data={currentProjectStatus as ProjectStatus} />;
  }, [isLoading, currentProjectStatus]);

  const projectActions = useMemo(() => {
    if (isLoading) {
      return (
        <Skeleton
          className={classes.projectTableButtonsSkeleton}
          width={100}
          height={40}
        />
      );
    }

    return (
      <div className={classes.projectTableButtonsWrapper}>
        {isCurrentChainIncluded ? (
          <>
            <CopyEndpointModal
              jwtTokens={jwtTokens}
              chain={projectChain}
              userEndpointToken={userEndpointToken}
            />
            {!isCodeExampleDisabled && (
              <>
                <Button
                  onClick={handleOpenCodeExample}
                  variant="outlined"
                  size="small"
                  className={classes.chainCodeExampleButton}
                  disabled={isCodeExampleDisabled}
                >
                  {t(keys.codeExample)}
                </Button>
                <CodeExampleModal
                  isOpenedCodeExample={isOpenedCodeExample}
                  onCloseCodeExample={handleCloseCodeExample}
                  chain={projectChain}
                />
              </>
            )}
          </>
        ) : (
          <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
            <Button
              size="small"
              variant="outlined"
              className={classes.copyEndpointBtn}
              onClick={handleOpenAddToProjectsDialog}
              startIcon={<Plus />}
            >
              {t(keys.addToProject)}
            </Button>
          </GuardUserGroup>
        )}
      </div>
    );
  }, [
    classes,
    handleCloseCodeExample,
    handleOpenAddToProjectsDialog,
    handleOpenCodeExample,
    isCodeExampleDisabled,
    isCurrentChainIncluded,
    isLoading,
    isOpenedCodeExample,
    jwtTokens,
    keys,
    projectChain,
    t,
    userEndpointToken,
  ]);

  if (shouldUseMobileLayout) {
    return (
      <Paper className={classes.projectMobileWrapper}>
        {projectStatus}
        <span className={classes.projectLinkName}>
          {name || t(keys.defaultName)}
        </span>
        <Typography variant="body4" color="textSecondary" mb={1} component="p">
          {t(keys.requestsTitleMobile, {
            timeframe: getTimeframeValue(timeframe),
          })}
        </Typography>
        <ProjectRequestsActivity
          hasData={Boolean(currentChainRequestsData)}
          isEmpty={!currentChainRequestsData}
          totalRequestsCount={currentChainRequestsData}
          isLoading={isLoading}
          isDisabled={!isCurrentChainIncluded}
        />
        {projectActions}
      </Paper>
    );
  }

  return (
    <TableRow
      onClick={handleGoToProject}
      classes={{ root: classes.projectRow }}
    >
      <TableCell
        className={cx(
          classes.projectsTableCell,
          classes.projectsTableBodyCell,
          classes.projectTableHeadCellNameCell,
        )}
      >
        <Link className={classes.projectLink} to={projectPath}>
          <span className={classes.projectLinkName}>
            {name || t(keys.defaultName)}
          </span>
          <ArrowRight className={classes.projectArrowIcon} />
        </Link>
      </TableCell>
      <TableCell
        className={cx(
          classes.projectsTableCell,
          classes.projectsTableBodyCell,
          classes.projectTableHeadCellStatusCell,
        )}
      >
        {projectStatus}
      </TableCell>
      <TableCell
        className={cx(
          classes.projectsTableCell,
          classes.projectsTableBodyCell,
          classes.projectsTableRequestsCell,
        )}
      >
        <ProjectRequestsActivity
          hasData={Boolean(currentChainRequestsData)}
          isEmpty={!currentChainRequestsData}
          totalRequestsCount={currentChainRequestsData}
          isLoading={isLoading}
          isDisabled={!isCurrentChainIncluded}
        />
      </TableCell>
      <TableCell
        className={cx(
          classes.projectsTableCell,
          classes.projectsTableBodyCell,
          classes.projectsTableButtonsCell,
        )}
        align="right"
      >
        {projectActions}
      </TableCell>
    </TableRow>
  );
};
