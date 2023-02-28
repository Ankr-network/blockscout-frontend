import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUpgradePlanBannerSkeletonStyles = makeStyles()(
  (theme: Theme) => ({
    root: {
      width: '100%',
      height: 155,
      padding: theme.spacing(10),
      marginBottom: theme.spacing(10),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        height: 280,
        alignItems: 'flex-start',
      },
    },
    image: {
      marginLeft: theme.spacing(4),
      width: 80,
      height: 80,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    titleMobile: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        width: 200,
        height: 40,
      },
    },
    text: {
      width: 130,
      height: 48,

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  }),
);
