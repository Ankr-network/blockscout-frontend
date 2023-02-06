import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';

export const useInfoBannerStyles = makeStyles<void, 'startIcon'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      display: 'flex',
      gridGap: theme.spacing(7.5),
      marginBottom: theme.spacing(13),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    plan: {
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 20,
      padding: theme.spacing(6, 8),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    free: {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.grey[900],
      height: 22,
      padding: '3px 7px',
      borderRadius: 8,
      backgroundColor: theme.palette.background.default,
      marginLeft: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    premium: {
      background: premiumColor,
      padding: 2,
      [`& .${classes.startIcon}`]: {
        color: theme.palette.primary.main,
      },
    },
    premiumContent: {
      background: theme.palette.background.paper,
      padding: theme.spacing(6, 8),
      borderRadius: 18,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    startIcon: {
      width: 22,
      color: theme.palette.grey[600],
      marginRight: theme.spacing(1),
    },
    title: {
      color: theme.palette.grey[900],
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      margin: theme.spacing(4, 0),
    },
    item: {
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
    },
    message: {
      color: theme.palette.grey[600],
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 400,
      '& em': {
        fontWeight: 600,
        fontStyle: 'normal',
      },
    },
    disabledButton: {
      '&&': {
        backgroundColor: 'transparent',
      },
    },
  }),
);
