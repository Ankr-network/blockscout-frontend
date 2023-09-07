import { DownTriangle, UpperTriangle } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ProjectRequestsActivityProps } from './types';
import { PercentSign, getPercent } from './utils/getPercent';
import { useProjectRequestsActivityStyles } from './useProjectRequestsActivityStyles';

const variant = 'subtitle3' as Variant;

export const ProjectRequestsActivity = ({
  todayRequests,
  yesterdayRequests,
}: ProjectRequestsActivityProps) => {
  const { isVisible, percent, sign } = useMemo(
    () => getPercent({ todayRequests, yesterdayRequests }),
    [todayRequests, yesterdayRequests],
  );

  const { classes } = useProjectRequestsActivityStyles(sign);

  const iconMap: Record<PercentSign, JSX.Element> = {
    0: <></>,
    1: <UpperTriangle className={classes.icon} />,
    [-1]: <DownTriangle className={classes.icon} />,
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.count} variant={variant}>
        {t('projects.list-project.count', { value: todayRequests })}
      </Typography>
      {isVisible && (
        <Typography className={classes.percent} variant={variant}>
          {t('projects.list-project.percent', { percent, sign })}
          {iconMap[sign]}
        </Typography>
      )}
    </div>
  );
};
