import { makeStyles } from 'tss-react/mui';

import { Sign } from 'modules/common/types/types';
import { COLOR_PURPLE } from 'uiKit/Theme/const';

export const useRequestsInfoStyles = makeStyles<Sign>()(
  (theme, relativeChangeSign) => {
    const persentColors = {
      [-1]: COLOR_PURPLE,
      0: theme.palette.text.secondary,
      1: theme.palette.success.main,
    };

    return {
      chart: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: theme.spacing(8),
      },
      requestsCount: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(0.5),
      },

      requestsCountValue: {
        letterSpacing: '-0.84px',
        display: 'flex',
      },

      requestsLabel: {
        paddingLeft: theme.spacing(2),
      },

      percent: {
        fontWeight: 500,
        color: persentColors[relativeChangeSign],
      },

      requestsChart: {
        marginRight: theme.spacing(10),
        width: '50%',
      },

      disabled: {
        color: theme.palette.grey[400],
      },
    };
  },
);
