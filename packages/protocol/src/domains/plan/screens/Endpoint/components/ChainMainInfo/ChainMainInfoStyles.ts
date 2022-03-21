import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(3.5),
  },
  logo: {
    width: 44,
    minHeight: 44,
    marginBottom: theme.spacing(2),
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 34,
  },
  right: {
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%',
  },
}));
