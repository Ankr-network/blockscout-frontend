import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 22,
  },
  label: {
    marginLeft: theme.spacing(1),
    border: '1px solid rgba(31, 34, 38, 0.1)',
    borderRadius: 18,
    lineHeight: 1,
    padding: '4px 6px',
  },
}));
