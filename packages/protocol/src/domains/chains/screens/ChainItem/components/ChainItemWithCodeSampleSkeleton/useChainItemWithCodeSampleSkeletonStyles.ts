import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useChainItemWithCodeSampleSkeletonStyles = makeStyles()(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacing(10),
      width: '100%',
      minHeight: 466,
      display: 'flex',
      overflow: 'hidden',

      [theme.breakpoints.down('md')]: {
        minHeight: 330,
      },
    },
    left: {
      width: '50%',
      padding: theme.spacing(8),

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    skeleton: {
      borderRadius: theme.shape.borderRadius,
    },
    title: {
      height: 40,
      marginTop: theme.spacing(18),
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(4),
      },
    },
    description: {
      height: 20,
    },
    right: {
      width: '50%',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    code: {
      height: '100%',
      width: '100%',
    },
  }),
);
