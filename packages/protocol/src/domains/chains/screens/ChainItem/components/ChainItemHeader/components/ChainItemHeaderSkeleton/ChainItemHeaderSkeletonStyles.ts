import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useChainItemHeaderSkeletonStyles = makeStyles<Theme>(theme => ({
  chainItemHeaderSkeleton: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    padding: theme.spacing(3.75),

    borderRadius: theme.spacing(3.75),

    backgroundColor: theme.palette.common.white,
  },
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(3.75),
  },
  left: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  logo: {
    width: theme.spacing(8.5),
    height: theme.spacing(8.5),
  },
  description: {
    margin: 0,
  },
  title: {
    width: theme.spacing(21.5),
    height: theme.spacing(5),
    marginBottom: theme.spacing(0.5),
  },
  subtitle: {
    width: theme.spacing(15.75),
    height: theme.spacing(3),
  },
  docs: {
    width: theme.spacing(10),
    height: theme.spacing(4),
  },
  controls: {
    display: 'flex',
    gap: theme.spacing(1.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  chainTypeSelector: {
    width: theme.spacing(38.5),
    height: theme.spacing(5),

    [theme.breakpoints.down('md')]: {
      width: theme.spacing(38),
      height: theme.spacing(4),
    },
  },
  groupSelector: {
    width: theme.spacing(58.75),
    height: theme.spacing(5),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: theme.spacing(5),
    },
  },
}));
