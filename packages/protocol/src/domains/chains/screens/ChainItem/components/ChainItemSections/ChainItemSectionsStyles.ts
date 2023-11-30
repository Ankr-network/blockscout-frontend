import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { MAX_WIDTH_TO_WRAP_TIMERAME_TABS } from './const';

export const useChainItemSectionsStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
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
      [theme.breakpoints.down(MAX_WIDTH_TO_WRAP_TIMERAME_TABS)]: {
        display: 'none',
      },
    },
  },
}));
