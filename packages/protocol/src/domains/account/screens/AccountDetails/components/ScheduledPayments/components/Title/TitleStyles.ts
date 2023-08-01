import { makeStyles } from 'tss-react/mui';

export const useTitleStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,

    gap: theme.spacing(2),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  label: {
    color: theme.palette.text.secondary,

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '163%',
  },
}));
