import { makeStyles } from '@material-ui/core/styles';

export const useBaseStyles = makeStyles(theme => ({
  root: {
    color: '#356DF3',

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',

    margin: '0 15px',

    cursor: 'pointer',

    // '&:last-child': {
    //   marginRight: 0,
    // },

    [theme.breakpoints.down('xs')]: {
      margin: '0 6px',
      fontSize: 12,
    },
  },
}));

export const useSelectedStyles = makeStyles(theme => ({
  selected: {
    margin: '0 6px',
    padding: '3px 9px',

    borderRadius: 6,

    backgroundColor: '#356DF3',

    color: '#ffffff',

    fontWeight: 700,

    [theme.breakpoints.down('xs')]: {
      margin: 0,
      padding: '0 6px',

      fontSize: 12,
    },
  },
}));
