import { makeStyles, Theme } from '@material-ui/core/styles';

export const usePrimaryTabStyles = makeStyles<Theme, boolean>(theme => ({
  chainItemTab: {
    overflow: 'visible',

    height: 'auto',
    marginRight: theme.spacing(3.75),
    padding: 0,

    border: '0 none',

    transition: 'color .3s, background-color .3s',

    color: isSelected =>
      isSelected ? theme.palette.primary.main : theme.palette.grey[600],
    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: 27,
    lineHeight: `${theme.spacing(4)}px`,

    '&:hover': {
      backgroundColor: 'transparent',

      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),

      fontSize: theme.spacing(2.5),
    },
  },
}));
