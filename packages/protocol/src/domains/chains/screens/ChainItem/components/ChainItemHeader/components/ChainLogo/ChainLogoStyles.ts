import { Theme, makeStyles } from '@material-ui/core';

export const useChainLogoStyles = makeStyles<Theme>(theme => ({
  chainLogo: {
    width: theme.spacing(8.5),
    height: theme.spacing(8.5),
  },
}));
