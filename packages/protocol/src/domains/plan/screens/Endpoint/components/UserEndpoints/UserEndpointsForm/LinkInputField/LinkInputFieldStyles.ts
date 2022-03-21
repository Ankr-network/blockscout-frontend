import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(() => ({
  root: {
    paddingRight: 0,
    borderRadius: 16,
    fontSize: 14,

    '& input': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  editButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
