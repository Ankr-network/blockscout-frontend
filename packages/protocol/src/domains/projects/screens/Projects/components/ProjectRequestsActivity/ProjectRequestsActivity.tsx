import { DownTriangle, UpperTriangle } from '@ankr.com/ui';
import { Skeleton, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ProjectActivity } from 'domains/projects/store';
import { Sign } from 'modules/common/types/types';

import { useProjectRequestsActivityStyles } from './useProjectRequestsActivityStyles';

export interface ProjectRequestsActivityProps extends ProjectActivity {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const ProjectRequestsActivity = ({
  isDisabled,
  isLoading,
  relativeChange,
  totalRequestsCount,
}: ProjectRequestsActivityProps) => {
  const relativeChangeSign = Math.sign(relativeChange || 0) as Sign;

  const { classes } = useProjectRequestsActivityStyles(relativeChangeSign);

  const iconMap: Record<Sign, JSX.Element> = {
    0: <></>,
    1: <UpperTriangle className={classes.icon} />,
    [-1]: <DownTriangle className={classes.icon} />,
  };

  const intlKey =
    relativeChange === 0
      ? 'projects.list-project.relative-change-zero'
      : 'projects.list-project.relative-change';

  const totalRequests = useMemo(() => {
    if (totalRequestsCount === 0) {
      return (
        <Typography
          className={classes.count}
          variant="body4"
          color="textSecondary"
        >
          {t('projects.list-project.no-requests-yet')}
        </Typography>
      );
    }

    const requestsCountString = t('projects.list-project.count', {
      value: totalRequestsCount,
    });

    return (
      <Typography
        className={classes.count}
        variant="body4"
        color={isDisabled ? 'textSecondary' : 'textPrimary'}
      >
        {requestsCountString}
      </Typography>
    );
  }, [classes.count, isDisabled, totalRequestsCount]);

  if (isLoading) {
    return <Skeleton width={60} />;
  }

  return (
    <div className={classes.root}>
      {totalRequests}
      {typeof relativeChange !== 'undefined' && (
        <Typography className={classes.percent} variant="subtitle3">
          {t(intlKey, { relativeChange, relativeChangeSign })}
          {iconMap[relativeChangeSign]}
        </Typography>
      )}
    </div>
  );
};
