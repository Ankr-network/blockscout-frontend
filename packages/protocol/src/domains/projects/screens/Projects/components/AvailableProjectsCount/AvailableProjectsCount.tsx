import { Info } from '@ankr.com/ui';
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { selectAllowedJwtsCount } from 'domains/jwtToken/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchJWTs } from 'domains/jwtToken/hooks/useFetchJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { TeamsOnboarding } from '../TeamsOnboarding';
import { useAvailableProjectsCountStyles } from './useAvailableProjectsCountStyles';

export const AvailableProjectsCount = () => {
  const totalProjectsCount = useAppSelector(selectAllowedJwtsCount);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoading, jwts } = useFetchJWTs({ group, skipFetching: true });
  const userProjectsCount = jwts.length;

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

      <TeamsOnboarding />
    </div>
  );
};
