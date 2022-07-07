import { makeStyles } from '@material-ui/core';

export const useFixedInputFieldStyles = makeStyles(theme => ({
  additionalInfo: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    marginBottom: -20,
    fontSize: 14,
    position: 'relative',
    zIndex: 1,
  },

  additionalInfoLoadingBox: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));
