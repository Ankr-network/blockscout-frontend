import { makeStyles } from 'tss-react/mui';

export const useChainsSkeletonStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
  },
  skeleton: {
    display: 'flex',
    gap: theme.spacing(30),
    alignItems: 'center',
    width: `100%`,
    height: theme.spacing(22.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    padding: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(10),
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    flexDirection: 'row-reverse',
  },
  header: {
    display: 'flex',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  sort: {
    width: theme.spacing(37.5),
    height: theme.spacing(8),
    borderRadius: 17,
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    width: theme.spacing(60),
    height: theme.spacing(8),
    borderRadius: 17,
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  name: {
    width: 166,
    height: 28,
    borderRadius: 17,

    [theme.breakpoints.down('sm')]: {
      width: 120,
    },
  },
  icon: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  content: {
    width: '100%',
    height: 32,
    borderRadius: 17,
  },
}));
