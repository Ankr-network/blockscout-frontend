import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  headerRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    maxWidth: theme.spacing(40.625),
    marginBottom: 15,
    paddingBottom: theme.spacing(1.25),

    borderBottom: `1px solid ${theme.palette.grey[400]}`,

    color: theme.palette.grey[600],

    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: `${theme.spacing(2)}px`,
  },
}));
