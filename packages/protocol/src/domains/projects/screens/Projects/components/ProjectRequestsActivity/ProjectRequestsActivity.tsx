import { DownTriangle, UpperTriangle } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectActivity } from 'domains/projects/store';
import { Sign } from 'modules/common/types/types';

import { useProjectRequestsActivityStyles } from './useProjectRequestsActivityStyles';

export interface ProjectRequestsActivityProps extends ProjectActivity {}

export const ProjectRequestsActivity = ({
  lastDayTotalRequestsCount,
  relativeChange,
}: ProjectRequestsActivityProps) => {
  const relativeChangeSign = Math.sign(relativeChange ?? 0) as Sign;

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

  return (
    <div className={classes.root}>
      <Typography className={classes.count} variant="subtitle3">
        {t('projects.list-project.count', { value: lastDayTotalRequestsCount })}
      </Typography>
      {typeof relativeChange !== 'undefined' && (
        <Typography className={classes.percent} variant="subtitle3">
          {t(intlKey, { relativeChange, relativeChangeSign })}
          {iconMap[relativeChangeSign]}
        </Typography>
      )}
    </div>
  );
};
