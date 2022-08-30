import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(4),
  },
  button: {
    width: 112,
    height: 32,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 11,
  },
}));
