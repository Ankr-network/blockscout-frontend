import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isMobile?: boolean) => ({
    menuButton: isMobile
      ? {
          position: 'relative',
          width: 'auto',
          padding: theme.spacing(2 * 1.25, 2 * 1.5),

          border: `2px solid ${theme.palette.divider}`,
          borderRadius: theme.spacing(2 * 1.5),

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
      marginRight: theme.spacing(2 * 1.5),
    },
  }),
);
