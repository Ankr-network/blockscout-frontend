import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useTextContentWrapperStyles = makeStyles<Theme>(theme => ({
  messageText: {
    position: 'relative',
    whiteSpace: 'pre-line',
    '&+&': {
      marginTop: theme.spacing(3),
    },
    '&>a': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
}));
