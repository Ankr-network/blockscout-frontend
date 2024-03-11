import { makeStyles } from 'tss-react/mui';

export const useChipStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,

    color: theme.palette.text.primary,

    fontSize: 14,
    borderRadius: 8,
    padding: theme.spacing(0.5, 2),
    height: 'auto',

    '& span': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 400,
    },
  },
}));
