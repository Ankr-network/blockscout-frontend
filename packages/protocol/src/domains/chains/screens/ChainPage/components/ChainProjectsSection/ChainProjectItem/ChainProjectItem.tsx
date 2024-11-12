import {
  Paper,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@ankr.com/ui';
import { useMemo } from 'react';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ProjectRequestsActivity } from 'domains/projects/screens/Projects/components/ProjectRequestsActivity';
import { ProjectStatusLabel } from 'domains/projects/components/ProjectStatusLabel';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useChainProjectsSectionStyles } from '../useChainProjectsSectionStyles';
import { chainProjectItemTranslation } from './translation';
import {
  IUseChainProjectItemProps,
  useChainProjectItem,
} from './useChainProjectItem';
import { ProjectActions } from './components/ProjectActions';

export interface IChainProjectItemProps extends IUseChainProjectItemProps {
  handleAddToProjectsDialogOpen: () => void;
  jwts: JWT[];
}

// eslint-disable-next-line max-lines-per-function
export const ChainProjectItem = ({
  chain,
  handleAddToProjectsDialogOpen,
  jwt,
  jwts,
  timeframe,
}: IChainProjectItemProps) => {
  const { name } = jwt;

  const {
    chain: fullChain,
    currentChainRequestsData,
    handleGoToProject,
    isCurrentChainIncluded,
    isDraft,
    projectPath,
    projectStatus,
    projectStatusLoading,
    projectTotalRequestsLoading,
    projectWhitelistBlockchains,
    projectWhitelistBlockchainsLoading,
  } = useChainProjectItem({
    chain,
    jwt,
    timeframe,
  });

  const { classes, cx } = useChainProjectsSectionStyles();

  const { keys, t } = useTranslation(chainProjectItemTranslation);

  const shouldUseMobileLayout = useIsSMDown();

  const projectStatusElement = useMemo(() => {
    if (projectStatusLoading) {
      return <Skeleton width={50} />;
    }

    return <ProjectStatusLabel isDraft={isDraft} status={projectStatus} />;
  }, [isDraft, projectStatus, projectStatusLoading]);

  const projectActions = (
    <ProjectActions
      chain={fullChain}
      handleAddToProjectsDialogOpen={handleAddToProjectsDialogOpen}
      isCurrentChainIncluded={isCurrentChainIncluded}
      jwt={jwt}
      jwts={jwts}
      loading={projectWhitelistBlockchainsLoading}
      projectWhitelistBlockchains={projectWhitelistBlockchains}
    />
  );

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
          isLoading={projectTotalRequestsLoading}
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
        {projectStatusElement}
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
          isLoading={projectTotalRequestsLoading}
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
