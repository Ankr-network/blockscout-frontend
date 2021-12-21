import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useButtonMetamaskStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: 7,
    position: 'relative',
    overflow: 'visible',
    border: `2px solid ${theme.palette.background.default}`,
    backgroundColor: theme.palette.background.default,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
      '& $plusIconWrapper': {
        backgroundColor: theme.palette.primary.dark,
      },
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
  },
  size_medium: {
    minWidth: 42,
    minHeight: 42,
  },
  plusIconWrapper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    padding: 4,
    borderRadius: '50%',
    lineHeight: 0,
    right: -13,
    bottom: -17,
    transition: 'background-color .3s',
  },
}));
