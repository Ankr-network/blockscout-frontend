import { makeStyles } from 'tss-react/mui';

const DEFAULT_PAGE_HEADER_WIDTH = 910;

export const useBaseChainsHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(7),
    marginBottom: theme.spacing(7.5),

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
  first: {
    gridColumnStart: 1,
    gridColumnEnd: 3,

    [theme.breakpoints.down('lg')]: {
      gridColumnEnd: 2,
    },
  },
}));
