import { makeStyles } from 'tss-react/mui';

export const useSelectChainCardStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(4, 5),
    marginBottom: theme.spacing(8),

    backgroundColor: theme.palette.background.default,
  },
  label: {
    marginBottom: theme.spacing(),

    color: theme.palette.text.secondary,

    fontSize: 14,
    fontWeight: 700,
    lineHeight: '135%',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
}));
