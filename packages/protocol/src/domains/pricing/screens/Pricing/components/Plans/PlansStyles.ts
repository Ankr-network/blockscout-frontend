import { makeStyles } from 'tss-react/mui';
import { plansPremiumColor, premiumColor } from 'uiKit/Theme/themeUtils';

export const usePlansStyles = makeStyles<void, 'tip' | 'plan'>()(
  (theme, _params, classes) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(5),
      marginBottom: theme.spacing(30),

      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        marginBottom: theme.spacing(20),
      },

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(10),
      },
    },
    container: {
      position: 'relative',
      padding: theme.spacing(0.5),
      borderRadius: 42,

      [`&.premium`]: {
        color: theme.palette.common.white,
        background: premiumColor,

        [`& .${classes.plan}`]: {
          height: '100%',
          borderRadius: 40,
        },

        [`& .${classes.tip}`]: {
          background: plansPremiumColor,
        },
      },

      [`&.enterprise .${classes.tip}`]: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.grey[900],
      },
    },
    plan: {
      background: theme.palette.background.paper,
      padding: theme.spacing(7.5),
      borderRadius: 42,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      [theme.breakpoints.down('xs')]: {
        borderRadius: 28,
      },
    },
    tip: {
      textTransform: 'uppercase',
      color: theme.palette.common.white,
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500,
      position: 'absolute',
      top: theme.spacing(-3),
      left: theme.spacing(7.5),
      height: theme.spacing(6),
      borderRadius: 9,
      padding: theme.spacing(0, 2.25),
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
      marginBottom: theme.spacing(8),

      [theme.breakpoints.down('md')]: {
        fontSize: 35,
        marginBottom: theme.spacing(6),
      },
    },
    price: {
      display: 'block',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(8),

      '& em': {
        color: theme.palette.text.primary,
        fontStyle: 'normal',
        fontSize: 28,
        lineHeight: '32.2px',
        fontWeight: 700,
        marginRight: theme.spacing(2),
      },
    },
    list: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
    info: {
      color: theme.palette.text.primary,
      display: 'block',
      marginBottom: theme.spacing(2),
      fontSize: 18,
      lineHeight: '27px',
      fontWeight: 600,

      [theme.breakpoints.down('md')]: {
        width: '50%',
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },

      '& em': {
        fontStyle: 'normal',
        fontWeight: 800,
      },
    },
    button: {
      fontSize: 20,
      lineHeight: '28px',
      height: theme.spacing(15),
      borderRadius: 20,
      marginTop: theme.spacing(16),

      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(6),
      },
    },
  }),
);
