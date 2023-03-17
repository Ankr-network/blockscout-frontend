import { makeStyles } from 'tss-react/mui';

export const useChainsSkeletonStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(7.5),
    flexWrap: 'wrap',
  },
  skeleton: {
    width: `calc((100% - ${theme.spacing(15)}) / 3)`,
    height: theme.spacing(55),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
    padding: theme.spacing(5),

    [theme.breakpoints.down('lg')]: {
      width: `calc((100% - ${theme.spacing(7.5)}) / 2)`,
    },

    [theme.breakpoints.down('xs')]: {
      width: `100%`,
    },
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  name: {
    width: 166,
    height: 44,
  },
  icon: {
    width: 56,
    height: 56,
  },
  content: {
    width: '100%',
    height: 54,
  },
}));
