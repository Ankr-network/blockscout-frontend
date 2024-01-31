import { makeStyles } from 'tss-react/mui';

export const usePersonalAccountInfoStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',

    gap: theme.spacing(1),
  },
}));
