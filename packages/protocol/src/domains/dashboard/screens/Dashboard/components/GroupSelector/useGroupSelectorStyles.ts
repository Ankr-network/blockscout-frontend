import { makeStyles } from 'tss-react/mui';

export const useGroupSelectorStyles = makeStyles()(theme => ({
  form: {
    width: 'auto',
  },
  value: {
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(2),
  },
  menuItem: {
    maxWidth: 240,
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
