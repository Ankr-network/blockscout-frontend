import { makeStyles } from 'tss-react/mui';

export const SELECT_WIDTH = 250;

export const useProjectSelectStyles = makeStyles()(() => ({
  value: { fontWeight: 600, display: 'inherit' },
  menuItem: {
    maxWidth: SELECT_WIDTH,
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}));
