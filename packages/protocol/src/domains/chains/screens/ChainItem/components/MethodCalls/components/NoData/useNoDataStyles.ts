import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useNoDataStyles = makeStyles<Theme>(theme => ({
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: '24px',
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
}));
