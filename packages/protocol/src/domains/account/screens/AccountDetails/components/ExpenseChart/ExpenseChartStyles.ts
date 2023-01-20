import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  expenseChartRoot: {
    position: 'relative',
  },
  preloader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}));
