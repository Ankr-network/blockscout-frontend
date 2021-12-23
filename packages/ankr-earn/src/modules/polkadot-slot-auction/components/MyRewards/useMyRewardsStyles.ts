import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMyRewardsStyles = makeStyles<Theme>(theme => ({
  button: {
    position: 'relative',
    padding: theme.spacing(0, 5),
    
    '& svg': {
      position: 'absolute',
    },
  },
  img: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  noCrowdloanArea: {
    padding: theme.spacing(19, 0, 8, 0),
  },
}));
