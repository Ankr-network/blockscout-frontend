import { makeStyles } from 'tss-react/mui';

export const useGraphStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(0.5),
  },
  item: {
    width: 6,
    height: 10,
    backgroundColor: theme.palette.grey[100],

    [`&:first-of-type`]: {
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
    },

    [`&:last-of-type`]: {
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
    },
  },
  filled: {
    backgroundColor: theme.palette.primary.main,
  },
}));
