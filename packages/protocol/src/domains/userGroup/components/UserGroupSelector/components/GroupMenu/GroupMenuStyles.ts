import { makeStyles } from 'tss-react/mui';

export const useGroupMenuStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: 17,

    boxShadow:
      '0 2px 5px rgba(31, 34, 38, 0.1), 0 3px 15px rgba(31, 34, 38, 0.1)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    padding: theme.spacing(),
  },
}));
