import { makeStyles } from 'tss-react/mui';

export const useNetworksSelectorTitleStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  title: {
    lineHeight: '135%',
    letterSpacing: '-0.01em',
  },
}));
