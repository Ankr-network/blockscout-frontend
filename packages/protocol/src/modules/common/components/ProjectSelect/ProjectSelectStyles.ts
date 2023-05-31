import { makeStyles } from 'tss-react/mui';

export const SELECT_WIDTH = 200;

export const useProjectSelectStyles = makeStyles()(theme => ({
  formWrapper: {
    width: SELECT_WIDTH,
  },
  value: { fontWeight: 600, display: 'inherit' },
  menuItem: {
    maxWidth: SELECT_WIDTH,
  },
  inputRoot: {
    '&&': {
      marginLeft: theme.spacing(3),
      minWidth: SELECT_WIDTH,
    },
  },
  select: {
    minWidth: SELECT_WIDTH,
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}));
