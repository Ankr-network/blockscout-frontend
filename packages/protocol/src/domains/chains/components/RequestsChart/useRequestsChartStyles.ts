import { makeStyles } from 'tss-react/mui';

export const useRequestsChartStyles = makeStyles()(() => ({
  root: {
    '& .recharts-legend-wrapper': {
      display: 'none',
    },
  },
}));
