import { makeStyles } from 'tss-react/mui';

export const useWhitelistStatusStyles = makeStyles()(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',

    minHeight: 24,
    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    backgroundColor: theme.palette.background.default,

    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',

    fontSize: 14,
    fontWeight: 400,
    lineHeight: '140%',
  },
}));
