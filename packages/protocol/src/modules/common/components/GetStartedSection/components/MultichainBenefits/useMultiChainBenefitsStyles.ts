import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useMultiChainBenefitsStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    title: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
    },
    wrapper: {
      display: 'flex',
      gap: theme.spacing(7.5),
      marginBottom: theme.spacing(6),

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    apiWrapper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(8),
      width: '33%',
      borderRadius: theme.spacing(5),
      backgroundImage: 'none',

      [theme.breakpoints.down('md')]: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },

      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        padding: theme.spacing(5.5, 4),
      },
    },
    img: {
      width: 80,
      height: 80,
      marginTop: theme.spacing(-4),
      marginLeft: theme.spacing(-4),
      marginBottom: theme.spacing(2),
    },
    mainTextSection: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('md')]: {
        width: '60%',
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    apiTitle: {
      marginBottom: theme.spacing(3),
    },
    apiDescription: {
      marginBottom: theme.spacing(4),
    },
    apiFeaturesList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(4),

      [theme.breakpoints.down('md')]: {
        width: '40%',
        padding: theme.spacing(0, 2 * 3),
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: 0,
        marginBottom: theme.spacing(4),
      },
    },
    apiFeaturesItem: {
      flexShrink: 0,
      fontSize: 14,
      lineHeight: '24px',
      padding: theme.spacing(0, 2),
      borderRadius: 8,
      backgroundColor: theme.palette.background.default,
      color: isLightTheme
        ? theme.palette.text.primary
        : theme.palette.text.secondary,

      '&+&': {
        marginTop: theme.spacing(2),
      },
    },
    apiLink: {
      marginTop: 'auto',
      whiteSpace: 'nowrap',
      alignSelf: 'flex-start',
      fontSize: 14,
      fontWeight: 400,
      textDecoration: 'underline',
      textUnderlineOffset: 4,
      textDecorationThickness: '0.5px',
      minHeight: 'auto',
      height: 'auto',

      '&&': {
        padding: 0,
      },

      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      },

      [theme.breakpoints.down('md')]: {
        marginTop: 0,
      },
    },
  }),
);
