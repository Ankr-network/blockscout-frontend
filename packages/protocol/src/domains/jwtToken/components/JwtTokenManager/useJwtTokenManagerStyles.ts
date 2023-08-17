import { makeStyles } from 'tss-react/mui';

export const useJwtTokenManagerStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(7.5),
    height: 98,
  },
  skeleton: {
    display: 'flex',
    gap: theme.spacing(5),
    marginBottom: theme.spacing(11),
  },
  item: {
    flexShrink: 0,
    width: 204,
    height: 84,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));
