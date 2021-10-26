import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useButtonSpecialStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: 7,
    minWidth: 48,
    minHeight: 48,
    position: 'relative',
    overflow: 'visible',
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.background.paper,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    '&:disabled': {
      opacity: 0.4,
      '& $plusIconWrapper': {
        backgroundColor: '#767c82',
      },
    },

    '& > span > svg': {
      width: '30px',
      height: '30px',
    },
  },
  plusIconWrapper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    padding: 3,
    borderRadius: '50%',
    width: 18,
    height: 18,
    right: -13,
    bottom: -17,
  },
}));
