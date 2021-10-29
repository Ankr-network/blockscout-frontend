import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useButtonMetamaskStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: 7,
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
  },
  size_large: {
    minWidth: 48,
    minHeight: 48,

    /* size for metamask fox icon */
    '& > span > svg': {
      width: '30px',
      height: '30px',
    },

    '& $plusIconWrapper': {
      width: 18,
      height: 18,
      right: -13,
      bottom: -17,
    },
  },
  size_medium: {
    minWidth: 42,
    minHeight: 42,

    '& $plusIconWrapper': {
      width: 18,
      height: 18,
      right: -13,
      bottom: -17,
    },
  },
  plusIconWrapper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    padding: 3,
    borderRadius: '50%',
  },
}));
