import { makeStyles } from 'tss-react/mui';

export const useJwtTokenManagerStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(7.5),
    height: theme.spacing(24),
  },
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 20,
  },
  skeleton: {
    display: 'flex',
    gap: theme.spacing(5),
    marginBottom: theme.spacing(11),
  },
  item: {
    flexShrink: 0,
    width: theme.spacing(51),
    height: theme.spacing(21),
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));
