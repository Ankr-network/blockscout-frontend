import { makeStyles } from 'tss-react/mui';
import { SELECT_WIDTH } from '../ChainSelector/useChainSelectorStyles';

export const useSubTypeSelectorStyles = makeStyles()(theme => ({
  form: {
    minWidth: theme.spacing(30),
  },
  value: {
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(2),
  },
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
