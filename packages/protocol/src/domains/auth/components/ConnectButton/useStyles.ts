import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isMobile?: boolean }>(theme => ({
  menuButton: ({ isMobile }) =>
    isMobile
      ? {
          position: 'relative',
          width: 'auto',
          padding: theme.spacing(1.25, 1.5),

          border: '2px solid #E7EBF3',
          borderRadius: theme.spacing(1.5),

          color: theme.palette.text.primary,
        }
      : {
          position: 'relative',
          width: 'auto',
        },
  button: {
    [theme.breakpoints.down('sm')]: {
      border: '2px solid rgba(31, 34, 38, 0.1)',
    },
  },
  walletIcon: {
    marginRight: theme.spacing(1.5),
  },
}));
