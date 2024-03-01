import { makeStyles } from 'tss-react/mui';

export const useFiltersStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),

    width: 370,

    backgroundColor: 'transparent',

    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-end',
    },
  },
}));
