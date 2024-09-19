import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderSkeletonStyles = makeStyles()(
  (theme: Theme) => ({
    chainItemHeaderSkeleton: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2 * 3.75),

      padding: theme.spacing(2 * 3.75),

      borderRadius: theme.spacing(5),

      backgroundColor: theme.palette.background.paper,
    },
    chainOverview: {
      display: 'flex',
      justifyContent: 'space-between',

      marginBottom: theme.spacing(2 * 3.75),
    },
    left: {
      display: 'flex',
      gap: theme.spacing(2 * 2),
    },
    logo: {
      width: theme.spacing(2 * 8.5),
      height: theme.spacing(2 * 8.5),
    },
    description: {
      margin: 0,
    },
    title: {
      width: theme.spacing(2 * 21.5),
      height: theme.spacing(2 * 5),
      marginBottom: theme.spacing(2 * 0.5),
      borderRadius: theme.spacing(3),
    },
    subtitle: {
      width: theme.spacing(2 * 15.75),
      height: theme.spacing(2 * 3),
      borderRadius: theme.spacing(3),
    },
    docs: {
      width: theme.spacing(2 * 10),
      height: theme.spacing(2 * 4),
      borderRadius: theme.spacing(3),
    },
    controls: {
      display: 'flex',
      gap: theme.spacing(2 * 1.5),

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    chainTypeSelector: {
      width: theme.spacing(2 * 38.5),
      height: theme.spacing(2 * 5),
      borderRadius: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        width: theme.spacing(2 * 38),
        height: theme.spacing(2 * 4),
      },
    },
    groupSelector: {
      width: theme.spacing(2 * 58.75),
      height: theme.spacing(2 * 5),
      borderRadius: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: theme.spacing(2 * 5),
      },
    },
  }),
);
