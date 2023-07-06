import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSignupDialogWeb3ContentStyles = makeStyles<boolean>()(
  (theme: Theme, isMobileView) => ({
    root: {
      '& div:first-of-type': {
        marginBottom: theme.spacing(3),
      },
    },
    title: {
      fontSize: 24,
      marginBottom: theme.spacing(10),
      marginRight: theme.spacing(10),

      [theme.breakpoints.up('xl')]: {
        fontSize: 30,
      },
    },

    message: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '19.6px',
      color: theme.palette.text.primary,
      margin: theme.spacing(0, 0, 0, 3),
      display: isMobileView ? 'block' : 'none',

      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },

    loading: {
      position: 'relative',
      padding: theme.spacing(10),
    },

    walletItem: {
      width: '100%',
      padding: theme.spacing(2, 4, 2, 2),

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',

      border: `2px solid ${theme.palette.background.default}`,
      borderRadius: 18,
      cursor: 'pointer',
      transition: 'background 0.2s',

      '& svg': {
        fontSize: 48,
      },

      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },

      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(30),
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(0),
      },

      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
        height: theme.spacing(15),

        '& svg': {
          fontSize: 28,
        },
      },
    },

    walletItemDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    walletItemTitle: {
      fontSize: 16,
      marginLeft: theme.spacing(2),
      fontWeight: 600,

      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4.5),
      },

      [theme.breakpoints.down('xs')]: {
        fontSize: 20,
      },
    },

    walletItemInstall: {
      marginLeft: 'auto',
      color: theme.palette.primary.main,
      fontSize: 13,
      fontWeight: 700,

      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },

    tooltip: {
      color: theme.palette.grey[900],
    },
  }),
);
