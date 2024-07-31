import { makeStyles } from 'tss-react/mui';

import { DEFAULT_PAGE_HEADER_WIDTH } from 'domains/chains/components/BaseChainsHeader/useBaseChainsHeaderStyles';

export const useChainsSkeletonStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(7.5),
    flexWrap: 'wrap',
  },
  skeleton: {
    width: `calc((100% - ${theme.spacing(15)}) / 3)`,
    height: theme.spacing(52),
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
  header: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(7),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `repeat(${DEFAULT_PAGE_HEADER_WIDTH}px 1fr)`,
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(5),
    },
  },
  sort: {
    width: theme.spacing(37.5),
    height: theme.spacing(8),
    borderRadius: 17,
    backgroundColor: theme.palette.background.paper,

    gridColumnStart: 1,
    gridColumnEnd: 3,

    [theme.breakpoints.down('lg')]: {
      gridColumnEnd: 2,
    },
  },
  search: {
    width: '100%',
    height: theme.spacing(8),
    borderRadius: 17,
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    width: 166,
    height: 28,
    borderRadius: 17,
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
