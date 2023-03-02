import { makeStyles } from 'tss-react/mui';

export const useRequestComposerStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    gap: theme.spacing(2 * 3.5),
  },
  right: {
    display: 'grid',
    gap: theme.spacing(6),

    width: '60%',
    height: 604,
  },
}));
