import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemSectionsStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2 * 3),
  },
  tabs: {
    minHeight: 44,
    overflowX: 'scroll',

    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  timeframe: {
    '&&': {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  },
}));
