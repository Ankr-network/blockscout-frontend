import { t } from '@ankr.com/common';
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { Info } from '@ankr.com/ui';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectAllowedJwtsCount,
  selectAllProjectsCount,
  selectJwtTokensLoadingState,
} from 'domains/jwtToken/store/selectors';

import { useAvailableProjectsCountStyles } from './useAvailableProjectsCountStyles';
import { ProjectsOnboarding } from '../ProjectsOnboarding';

export const AvailableProjectsCount = () => {
  const totalProjectsCount = useAppSelector(selectAllowedJwtsCount);
  const userProjectsCount = useAppSelector(selectAllProjectsCount);
  const isLoading = useAppSelector(selectJwtTokensLoadingState);

  const { classes } = useAvailableProjectsCountStyles();

  return (
    <div className={classes.root}>
      <Typography color="textSecondary" variant="body3">
        {isLoading ? (
          <Skeleton variant="text" width={145} />
        ) : (
          t('projects.list-project.projects-count', {
            totalProjectsCount,
            userProjectsCount,
          })
        )}
      </Typography>

      <Tooltip
        title={t('projects.list-project.tooltip')}
        placement="top"
        className={classes.tooltip}
      >
        <Info className={classes.infoIcon} />
      </Tooltip>

      <ProjectsOnboarding />
    </div>
  );
};
