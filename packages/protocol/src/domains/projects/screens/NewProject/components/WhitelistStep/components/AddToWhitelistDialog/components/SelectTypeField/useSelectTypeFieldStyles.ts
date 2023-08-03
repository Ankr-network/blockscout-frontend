import { makeStyles } from 'tss-react/mui';

export const useSelectTypeFieldStyles = makeStyles()(theme => ({
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  selectPlaceholder: {
    position: 'absolute',
    top: 44,
    left: 16,
    color: theme.palette.text.secondary,
    fontSize: 16,
    fontWeight: 600,

    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
}));
