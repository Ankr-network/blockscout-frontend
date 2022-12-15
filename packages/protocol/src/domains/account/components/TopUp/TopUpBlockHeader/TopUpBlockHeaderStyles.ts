import { makeStyles, Theme } from '@material-ui/core';

export const useTopUpBlockHeaderStyles = makeStyles<Theme>(theme => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 700,
    lineHeight: '26px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  link: {
    height: 'auto',
    padding: '0',
    minWidth: 'auto',
    lineHeight: '26px',
  },
}));
