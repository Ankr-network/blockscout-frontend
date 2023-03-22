import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: theme.spacing(0, 7),
  },
  title: {
    color: theme.palette.common.white,

    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(6),
  },
}));
