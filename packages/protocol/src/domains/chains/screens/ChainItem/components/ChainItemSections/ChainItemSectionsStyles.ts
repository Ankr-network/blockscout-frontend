import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { MAX_WIDTH_TO_WRAP_TIMERAME_TABS } from './const';

export const useChainItemSectionsStyles = makeStyles()((theme: Theme) => ({
  chainItemSectionsRoot: {
    marginTop: theme.spacing(6),
  },
  chainItemSectionsTabs: {
    minHeight: 44,
    overflowX: 'scroll',

    /* hiding scrollbar styles: */
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
