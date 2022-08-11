import { Theme, makeStyles } from '@material-ui/core';

export const useChainDocsLinkStyles = makeStyles<Theme>(theme => ({
  button: {
    height: theme.spacing(5),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(1.75),
  },
  iconSize: {
    '& > *:first-child': {
      fontSize: theme.spacing(3),
    },
  },
}));
