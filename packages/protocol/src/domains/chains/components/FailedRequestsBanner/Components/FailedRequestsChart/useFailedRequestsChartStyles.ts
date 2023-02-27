import { makeStyles } from 'tss-react/mui';

export const useFailedRequestsChartStyles = makeStyles()(() => ({
  root: {
    '& .recharts-legend-wrapper': {
      display: 'none',
    },
  },
}));
