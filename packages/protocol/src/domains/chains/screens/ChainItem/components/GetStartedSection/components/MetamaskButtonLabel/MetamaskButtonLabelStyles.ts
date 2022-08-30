import { Theme, makeStyles } from '@material-ui/core';

export const useMetamaskButtonLabelStyles = makeStyles<Theme>(theme => ({
  metamaskButtonLabel: {
    marginLeft: theme.spacing(1),

    color: theme.palette.primary.main,

    fontWeight: 600,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
