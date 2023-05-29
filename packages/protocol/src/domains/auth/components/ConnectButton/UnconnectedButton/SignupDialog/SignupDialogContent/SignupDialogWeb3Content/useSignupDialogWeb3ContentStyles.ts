import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSignupDialogWeb3ContentStyles = makeStyles()(
  (theme: Theme) => ({
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

      [theme.breakpoints.up('sm')]: {
        height: 144,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(0),
      },

      '& svg': {
        fontSize: 64,
      },

      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },

    walletItemDisabled: {
      backgroundColor: theme.palette.action.disabledBackground,
      borderColor: theme.palette.action.disabledBackground,

      '&:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },

    walletItemTitle: {
      fontSize: 14,
      marginLeft: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4.5),
      },
    },

    walletItemInstall: {
      marginLeft: 'auto',
      color: theme.palette.primary.main,
      fontSize: 13,
      fontWeight: 700,

      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(1),
      },
    },
  }),
);
