import { makeStyles } from 'tss-react/mui';
import {
  bannerGradientDark,
  bannerGradientLight,
  premiumText,
} from 'uiKit/Theme/themeUtils';

export const useUpgradePlanBannerStyles = makeStyles<boolean>()(
  (theme, isLightTheme) => ({
    root: {
      marginBottom: theme.spacing(10),
      maxWidth: 940,
      marginLeft: 'auto',
      marginRight: 'auto',

      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(8),
      },
    },
    wrapper: {
      padding: theme.spacing(2 * 3.75),
      display: 'flex',
      alignItems: 'center',
      background: isLightTheme ? bannerGradientLight : bannerGradientDark,
      justifyContent: 'flex-end',
      overflow: 'hidden',
      position: 'relative',

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    image: {
      width: 150,
      marginTop: theme.spacing(-2 * 3.75),
      marginBottom: theme.spacing(-2 * 3.75),
      marginRight: theme.spacing(3.75),

      [theme.breakpoints.down('md')]: {
        position: 'absolute',
        right: '-85px',
        top: '30px',
        width: 206,
      },
    },
    plan: {
      width: '35%',
      [theme.breakpoints.down('md')]: {
        width: '60%',
        marginBottom: theme.spacing(8),
      },
    },
    planTitle: {
      display: 'inline-flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1.5),
    },
    yourPlanBadge: {
      background: theme.palette.background.paper,
      padding: theme.spacing(0.8, 2.5),
      borderRadius: theme.shape.borderRadius,
      whiteSpace: 'nowrap',
      marginLeft: theme.spacing(2),
      fontWeight: 500,
    },
    planDescription: {
      fontSize: 14,
    },
    proposal: {
      width: '35%',
      [theme.breakpoints.down('md')]: {
        width: '70%',
      },
    },
    proposalTitle: {
      width: 'fit-content',
      background: premiumText,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: theme.spacing(1),
      display: 'inline-flex',
    },
    proposalDescription: {
      fontSize: 14,
      whiteSpace: 'pre-line',
    },
    action: {
      marginLeft: theme.spacing(4),
      whiteSpace: 'nowrap',

      '&:hover': {
        backgroundColor: isLightTheme ? theme.palette.grey[100] : '#E7EBF3',
      },

      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 0,
        marginTop: theme.spacing(4),
      },
    },
  }),
);
