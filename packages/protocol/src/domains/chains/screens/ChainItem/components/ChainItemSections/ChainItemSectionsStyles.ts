import { Theme, makeStyles } from '@material-ui/core/styles';

export const useChainItemSectionsStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  tabs: {
    overflowX: 'scroll',

    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  timeframe: {
    [theme.breakpoints.down('lg')]: {
      display: 'none !important',
    },
  },
}));
