import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const multiChainBenefitsStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    wrapper: {
      display: 'flex',
      gap: theme.spacing(7),

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    apiWrapper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2 * 4),
      width: '33%',

      [theme.breakpoints.down('md')]: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },

      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    img: {
      width: 94,
      height: 94,
      marginTop: theme.spacing(-6),
      marginLeft: theme.spacing(-4),
      marginBottom: theme.spacing(4),
    },
    apiTitle: {
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('md')]: {
        width: '20%',
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    apiFeaturesList: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('md')]: {
        width: '45%',
        padding: theme.spacing(0, 2 * 3),
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: 0,
        marginBottom: theme.spacing(4),
      },
    },
    apiFeaturesItem: {
      fontSize: 13,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      color: isLightTheme
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
      '&+&': {
        borderTop: `1px solid ${theme.palette.grey[100]}`,
      },
    },
    apiLink: {
      marginTop: 'auto',
      whiteSpace: 'nowrap',
      padding: 0,
      alignSelf: 'flex-start',
      fontSize: 14,

      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
      },

      [theme.breakpoints.down('md')]: {
        marginTop: 0,
      },
    },
  }),
);
