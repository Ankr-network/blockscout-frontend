import { Theme, makeStyles } from '@material-ui/core';

export const useSubscriptionsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3.5),
    borderRadius: theme.spacing(3),
    background: theme.palette.background.paper,
    gap: theme.spacing(2.5),
  },
  title: {
    fontSize: 14,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: theme.spacing(2.5),
  },
  textContainer: {
    display: 'flex',
    gap: theme.spacing(1.5),
    // width: '100%',
  },
  text: {
    fontSize: 20,
  },
  cancel: {
    color: theme.palette.error.main,
    cursor: 'pointer',
  },
}));
