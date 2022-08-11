import { Theme, makeStyles } from '@material-ui/core';

export const useChainTitleStyles = makeStyles<Theme>(theme => ({
  chainTitle: {
    marginBottom: theme.spacing(0.5),

    letterSpacing: '-0.01em',

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(4.25),
    lineHeight: `${theme.spacing(5)}px`,
  },
}));
