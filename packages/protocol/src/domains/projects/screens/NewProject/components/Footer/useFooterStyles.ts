import { makeStyles } from 'tss-react/mui';

export const useFooterStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `2px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(2.5, 7),
    marginTop: 'auto',
    borderRadius: 0,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  step: {
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
  rightWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
  },
  skipButton: {
    color: theme.palette.text.secondary,
  },
}));
