import { t } from '@ankr.com/common';
import { DownTriangle, UpperTriangle } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { useProjectRequestsActivityStyles } from './useProjectRequestsActivityStyles';

export interface ProjectRequestsActivityProps {
  requestsCount: number;
  isMoreRequestsTodayThanYesterday: boolean;
  percent: string;
}

const SHOULD_HIDE_DIFFERCNCE = true;

export const ProjectRequestsActivity = ({
  requestsCount,
  isMoreRequestsTodayThanYesterday,
  percent,
}: ProjectRequestsActivityProps) => {
  const { classes } = useProjectRequestsActivityStyles(
    isMoreRequestsTodayThanYesterday,
  );

  return (
    <div className={classes.root}>
      <Typography
        className={classes.text}
        noWrap
        component="p"
        variant={'body3' as Variant}
      >
        {t('projects.list-project.requests')}
      </Typography>
      <Typography className={classes.count} variant={'subtitle3' as Variant}>
        {t('projects.list-project.count', { value: requestsCount })}
      </Typography>
      {!SHOULD_HIDE_DIFFERCNCE && (
        <Typography
          className={classes.percent}
          variant={'subtitle3' as Variant}
        >
          {percent}
          {isMoreRequestsTodayThanYesterday ? (
            <UpperTriangle className={classes.icon} />
          ) : (
            <DownTriangle className={classes.icon} />
          )}
        </Typography>
      )}
    </div>
  );
};
