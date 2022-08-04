import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useNoDataStyles = makeStyles<Theme>(theme => ({
  root: {
    height: theme.spacing(50),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 27,
    lineHeight: '32px',
    fontWeight: 700,
    marginBottom: theme.spacing(2.5),
  },
  content: {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: theme.palette.grey[600],
    width: theme.spacing(38),
  },
}));
