import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import {
  bannerGradientDark,
  bannerGradientLight,
  premiumText,
} from 'uiKit/Theme/themeUtils';

export const useUpgradePlanBannerContentStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    wrapper: {
      padding: theme.spacing(2 * 3.75),
      display: 'flex',
      alignItems: 'center',
      background: isLightTheme ? bannerGradientLight : bannerGradientDark,
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    image: {
      width: 150,
      minWidth: 150,
      marginTop: theme.spacing(-2 * 3.75),
      marginBottom: theme.spacing(-2 * 4.5),
      marginRight: theme.spacing(3.75),

      '& img': {
        width: '100%',
        height: 146,
      },

      [theme.breakpoints.down('md')]: {
        position: 'absolute',
        right: '-85px',
        top: '30px',
        width: 206,

        '& img': {
          height: 205,
        },
      },
    },
    plan: {
      width: '35%',
      paddingRight: theme.spacing(5),
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
      padding: theme.spacing(0.75, 1.875),
      borderRadius: 8,
      whiteSpace: 'nowrap',
      marginLeft: theme.spacing(2),
      fontSize: 12,
      lineHeight: '16.2px',
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
