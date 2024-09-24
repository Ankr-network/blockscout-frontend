import { makeStyles } from 'tss-react/mui';

const name = 'TimePeriodFilter';

export const useTimePeriodFilterStyles = makeStyles({ name })(theme => ({
  root: {
    height: 32,
    padding: theme.spacing(1.5, 2, 1.5, 3),

    borderRadius: 12,

    '&&.Mui-focused': {
      boxShadow: 'none',
    },
  },
  select: {
    '&&&&&': {
      padding: theme.spacing(0, 5, 0, 0),

      color: theme.palette.text.primary,

      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.43,
    },
  },
  icon: {
    height: 20,
    width: 20,

    color: theme.palette.text.secondary,
  },
}));
