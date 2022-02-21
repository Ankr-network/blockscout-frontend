import { makeStyles } from '@material-ui/core';

export const useStakeDescriptionValueStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    marginRight: theme.spacing(1),

    '&&': {
      justifySelf: 'end',
      alignSelf: 'center',
      fontSize: 16,
      textAlign: 'right',
    },
  },

  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 200,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 100,
    },
  },
}));
