import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    gap: 12,
  },
  button: {
    minWidth: 210,
  },
}));
