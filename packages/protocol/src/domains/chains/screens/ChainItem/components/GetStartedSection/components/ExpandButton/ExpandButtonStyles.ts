import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  expandButton: {
    overflow: 'visible',

    height: 'auto',
    padding: 0,

    border: '0 none',

    fontWeight: 600,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
