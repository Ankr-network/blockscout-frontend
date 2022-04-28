import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(() => ({
  root: {
    paddingRight: 0,
    borderRadius: 12,
    fontSize: 14,
    height: 44,

    '& input': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      minHeight: 32,
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
