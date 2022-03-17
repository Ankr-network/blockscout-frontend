import { makeStyles } from '@material-ui/core/styles';

export const useBaseStyles = makeStyles(theme => ({
  root: {
    color: '#356DF3',

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
}));

export const useSelectedStyles = makeStyles(theme => ({
  selected: {
    padding: '3px 9px',

    borderRadius: 6,

    backgroundColor: '#356DF3',

    color: '#ffffff',

    fontWeight: 700,

    [theme.breakpoints.down('xs')]: {
      padding: '0 6px',

      fontSize: 12,
    },
  },
}));
