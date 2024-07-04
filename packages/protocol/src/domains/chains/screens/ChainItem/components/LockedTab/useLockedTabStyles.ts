import { makeStyles } from 'tss-react/mui';

export const useLockedTabStyles = makeStyles()(theme => ({
  lockedTabRoot: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    color: theme.palette.text.disabled,
  },
  lockIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
}));
