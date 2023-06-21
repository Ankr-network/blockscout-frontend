import { makeStyles } from 'tss-react/mui';

export const SELECT_WIDTH = 200;

export const useChainSelectorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(2),
  },
  form: {
    width: SELECT_WIDTH,
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
  icon: {
    width: 24,
    height: 24,
  },
  iconChain: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(2),
  },
  content: {
    '& > div': {
      marginTop: 0,
    },
  },
}));
