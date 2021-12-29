import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useDefaultLayoutStyles = makeStyles((theme: Theme) => ({
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 0, 3),
  },
  button: {
    position: 'relative',

    '&:active': {
      transform: 'none',
    },
    '& svg': {
      position: 'absolute',
    },
  },
}));
