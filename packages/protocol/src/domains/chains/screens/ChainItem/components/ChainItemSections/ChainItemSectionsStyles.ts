import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

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
      display: 'none',
    },
  },
}));
