import { makeStyles } from 'tss-react/mui';

export const useSearchInputStyles = makeStyles()(theme => ({
  searchInputField: {
    width: 280,
    height: 32,
    borderRadius: 3,
    '& input': {
      fontSize: 14,
    },
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
    pointerEvents: 'none',
  },
}));
