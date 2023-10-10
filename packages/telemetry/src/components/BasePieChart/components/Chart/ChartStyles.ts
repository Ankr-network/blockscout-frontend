import { makeStyles } from 'tss-react/mui';

export const useChartStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
  },
  chart: {
    svg: {
      overflow: 'visible',
    },
  },
  amount: {
    position: 'absolute',
    inset: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',

    color: theme.palette.text.primary,
  },
}));
