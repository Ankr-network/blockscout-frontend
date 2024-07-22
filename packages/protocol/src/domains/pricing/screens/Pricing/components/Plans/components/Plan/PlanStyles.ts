import { makeStyles } from 'tss-react/mui';

import { premiumGradient } from 'uiKit/Theme/themeUtils';

const INFO_ICON_HEIGHT = 20;

/* eslint-disable max-lines-per-function */
export const usePlanStyles = makeStyles<void, 'tip' | 'root'>()(
  (theme, _params, classes) => ({
    container: {
      position: 'relative',
      padding: theme.spacing(0.5),
      borderRadius: 42,
      height: '100%',
    },
    root: {
      background: theme.palette.background.paper,
      padding: theme.spacing(6),
      borderRadius: 16,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      height: 120,
    },
    tip: {
      textTransform: 'uppercase',
      color: theme.palette.common.white,
      fontSize: 10,
      lineHeight: '135%',
      fontWeight: 500,
      marginBottom: theme.spacing(2.5),
      borderRadius: 5,
      padding: theme.spacing(0.5, 1, 0.5, 1.25),
      width: 'fit-content',
    },

    premium: {
      color: theme.palette.text.primary,

      [`& .${classes.root}`]: {
        height: '100%',
        borderRadius: 18,
      },

      [`& .${classes.tip}`]: {
        background: premiumGradient,
      },
    },

    enterprise: {
      [`& .${classes.tip}`]: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.grey[900],
      },
    },

    row: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    title: {
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2),
    },
    premiumTitle: {
      background: premiumGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    freeTitle: {
      paddingTop: theme.spacing(7),
      color: theme.palette.text.secondary,
    },
    price: {
      display: 'block',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(3),

      '& em': {
        color: theme.palette.text.primary,
        fontStyle: 'normal',
        marginRight: theme.spacing(2),
      },
    },
    divider: {
      color: theme.palette.background.default,
      height: 2,
      marginBottom: theme.spacing(6),
      borderBottomWidth: 2,
    },
    list: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
    info: {
      color: theme.palette.grey[900],
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3),
      fontSize: 16,
      lineHeight: `${INFO_ICON_HEIGHT}px`,

      [theme.breakpoints.down('md')]: {
        width: '50%',
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },

      '& em': {
        fontStyle: 'normal',
        fontWeight: 700,
      },
    },
    infoIcon: {
      height: INFO_ICON_HEIGHT,
      marginRight: theme.spacing(1.5),
    },
    freeIcon: {
      color: theme.palette.text.secondary,
    },
    premiumIcon: {
      color: theme.palette.purple.main,
    },
    enterpriseIcon: {
      color: '#F5841F', // there is no such color in current uikit
    },
  }),
);
