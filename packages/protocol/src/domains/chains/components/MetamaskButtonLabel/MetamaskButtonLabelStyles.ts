import { makeStyles } from 'tss-react/mui';

export const useMetamaskButtonLabelStyles = makeStyles()(theme => ({
  metamaskButtonLabel: {
    marginLeft: theme.spacing(2 * 1),

    color: theme.palette.primary.main,

    fontWeight: 600,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },

    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}));
