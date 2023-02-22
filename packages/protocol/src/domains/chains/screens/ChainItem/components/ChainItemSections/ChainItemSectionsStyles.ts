import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemSectionsStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2 * 3),
  },
  tabs: {
    minHeight: 44,
    overflowX: 'scroll',

    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',

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
