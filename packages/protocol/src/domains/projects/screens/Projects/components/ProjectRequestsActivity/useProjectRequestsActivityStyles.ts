import { makeStyles } from 'tss-react/mui';

import { PercentSign } from './utils/getPercent';

export const useProjectRequestsActivityStyles = makeStyles<PercentSign>()(
  (theme, sign) => {
    const colorMap: Record<PercentSign, string> = {
      0: theme.palette.text.secondary,
      1: theme.palette.success.main,
      [-1]: theme.palette.error.main,
    };

    const color = colorMap[sign];

    return {
      root: {
        display: 'flex',
        alignItems: 'center',
      },
      text: {
        color: theme.palette.grey[600],
      },
      count: {
        margin: theme.spacing(0, 2),

        color: theme.palette.grey[900],

        fontWeight: 400,
        lineHeight: '140%',
      },
      percent: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),

        color,

        fontWeight: 400,
        lineHeight: '140%',
      },
      icon: {
        color,

        fontSize: 14,
      },
    };
  },
);
