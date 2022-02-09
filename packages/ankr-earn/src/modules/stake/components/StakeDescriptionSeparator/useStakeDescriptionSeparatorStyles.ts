import { alpha, makeStyles } from '@material-ui/core';

export const useStakeDescriptionSeparatorStyles = makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  },
}));
