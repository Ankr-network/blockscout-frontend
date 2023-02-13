import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';

export const usePlansStyles = makeStyles<void, 'container'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      columnGap: theme.spacing(2 * 3.75),
      rowGap: theme.spacing(2 * 2),
      marginTop: theme.spacing(2 * 5),
      position: 'relative',

      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },
    plan: {
      background: theme.palette.background.paper,
      borderRadius: 40,
      padding: theme.spacing(2 * 0.5),
      position: 'relative',

      [theme.breakpoints.down('xs')]: {
        borderRadius: 28,
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      background: theme.palette.background.paper,
      borderRadius: 36,
      padding: theme.spacing(2 * 4.5),

      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2 * 3),
        borderRadius: 24,
      },
    },
    premium: {
      background: premiumColor,

      [`& .${classes.container}`]: {
        background: theme.palette.background.paper,
      },
    },

    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    titleWrapper: {
      marginBottom: theme.spacing(2 * 1),

      color: theme.palette.text.primary,
    },
    title: {
      fontSize: 35,

      [theme.breakpoints.down('sm')]: {
        fontSize: 28,
      },
    },
    premiumTitle: {
      '& span': {
        lineHeight: 1.167,
      },
    },
    label: {
      marginBottom: theme.spacing(2 * 1),
      fontSize: 20,

      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
      },
    },
    description: {
      fontWeight: 400,

      color: theme.palette.text.primary,

      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(2 * 3.5),
      marginBottom: theme.spacing(2 * 5),
    },
    feature: {
      background: theme.palette.background.default,
      borderRadius: 20,
      padding: theme.spacing(2 * 1, 2 * 2),
      display: 'inline-block',
      marginBottom: theme.spacing(2 * 0.5),
      '&:nth-of-type(2n+1)': {
        marginRight: theme.spacing(2 * 0.5),
      },
    },
    featureText: {
      fontWeight: 600,

      color: theme.palette.text.primary,
    },
    link: {
      padding: 0,
      height: 'auto',
      '&:hover': {
        color: theme.palette.primary.main,
        background: 'none',
      },
    },
    button: {
      '&:hover': {
        color: theme.palette.background.paper,
      },
    },
  }),
);
