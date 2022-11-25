import { alpha, makeStyles } from '@material-ui/core';

export const useStakeStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  tokenInfoArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(-2, 0, 4, 0),
    padding: theme.spacing(1.75, 2, 1.75, 2),
    border: `2px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
    borderRadius: 12,
  },

  tokenInfoIcon: {
    minWidth: '60px',
    minHeight: '60px',
    margin: theme.spacing(0, 2, 0, 0),
  },
}));
