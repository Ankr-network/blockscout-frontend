import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMyRewardsStyles = makeStyles<Theme>(theme => ({
  button: {
    position: 'relative',

    '& svg': {
      position: 'absolute',
    },
  },

  img: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
    borderRadius: 5,
  },

  noCrowdloanArea: {
    padding: theme.spacing(19, 0, 8, 0),
  },
}));
