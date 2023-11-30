import { makeStyles } from 'tss-react/mui';

export const useDescriptionStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    marginBottom: theme.spacing(4),
  },
}));
