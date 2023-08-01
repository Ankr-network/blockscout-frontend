import { makeStyles } from 'tss-react/mui';

export const useChipStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,

    color: theme.palette.text.primary,

    fontSize: 14,
    fontWeight: 500,
    lineHeight: '143%',
  },
}));
