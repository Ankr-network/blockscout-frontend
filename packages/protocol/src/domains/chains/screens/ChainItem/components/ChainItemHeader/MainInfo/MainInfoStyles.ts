import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  description: {
    display: 'flex',
  },
  archived: {
    marginLeft: theme.spacing(1),
    borderRadius: 6,
    lineHeight: 1,
    padding: '4px 6px',
    background: theme.palette.background.default,
    cursor: 'pointer',
  },
}));
