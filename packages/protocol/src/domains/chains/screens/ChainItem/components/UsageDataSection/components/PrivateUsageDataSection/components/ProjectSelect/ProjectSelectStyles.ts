import { makeStyles } from 'tss-react/mui';

export const SELECT_WIDTH = 250;

export const useProjectSelectStyles = makeStyles()(theme => ({
  value: { fontWeight: 600, display: 'inherit' },
  menuItem: {
    maxWidth: SELECT_WIDTH,
  },
  inputRoot: {
    '&&': {
      marginLeft: theme.spacing(3),
    },
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}));
