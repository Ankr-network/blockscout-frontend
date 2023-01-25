import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';

export const usePremiumBlockStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    container: {
      background: premiumColor,
      borderRadius: theme.spacing(2 * 7.5),
      padding: theme.spacing(2 * 0.5),
      maxWidth: 810,
      marginLeft: 'auto',
      marginRight: 'auto',

      [theme.breakpoints.down('sm')]: {
        borderRadius: theme.spacing(2 * 3.5),
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2 * 9.5, 2 * 2.5),
      textAlign: 'center',
      position: 'relative',
      borderRadius: theme.spacing(2 * 7.25),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2 * 5, 2 * 3.5),
        borderRadius: theme.spacing(2 * 3.25),
      },
    },
    wrapper: {
      padding: theme.spacing(2 * 1, 3),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2 * 0, 2),
      },
    },
    blockTitle: {
      fontSize: 52,
      marginBottom: theme.spacing(2 * 5),
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: isLightTheme
        ? theme.palette.text.primary
        : theme.palette.text.secondary,

      [theme.breakpoints.down('xs')]: {
        fontSize: 32,
        maxWidth: 285,
        marginBottom: theme.spacing(2 * 2.5),
      },
    },
    title: {
      marginTop: theme.spacing(2 * 1),
      marginBottom: theme.spacing(2 * 5),
      fontSize: 35,
      maxWidth: 500,
      marginLeft: 'auto',
      marginRight: 'auto',

      [theme.breakpoints.down('sm')]: {
        fontSize: 28,
      },

      [theme.breakpoints.down('xs')]: {
        fontSize: 26,
      },
    },
    button: {
      '& button': {
        fontSize: 16,
        width: 320,
        height: 60,
        marginBottom: 60,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          maxWidth: 320,
        },
      },
    },
    form: {
      width: 390,
      margin: theme.spacing(0, 'auto'),

      [theme.breakpoints.down('sm')]: {
        width: 360,
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    prcingContent: {
      height: 340,
    },
    info: {
      fontWeight: 400,
      marginBottom: theme.spacing(2 * 1),

      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    link: {
      padding: 0,
      height: 'auto',
      fontSize: 16,
      alignSelf: 'center',

      '&:hover': {
        color: theme.palette.primary.main,
        background: 'none',
      },
    },
  }),
);
