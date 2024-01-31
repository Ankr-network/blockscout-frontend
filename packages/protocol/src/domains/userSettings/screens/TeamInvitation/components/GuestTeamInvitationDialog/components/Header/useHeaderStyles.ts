import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    alignItems: 'center',
  },
  label: {
    color: theme.palette.text.secondary,
  },
  logoRoot: {
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 48,
  },
  logoText: {
    fontSize: 36,
  },
}));
