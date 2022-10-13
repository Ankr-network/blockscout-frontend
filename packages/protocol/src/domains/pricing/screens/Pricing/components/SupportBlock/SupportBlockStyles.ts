import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSupportBlockStyles = makeStyles<Theme>(theme => ({
  contactBlock: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: 405,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
      flexDirection: 'column',
    },
  },
  contactBlockHeader: {
    fontWeight: 400,
  },
  contactBlockBtn: {
    marginLeft: theme.spacing(5),
    backgroundColor: theme.palette.common.white,
    color: '#5865F2',
    '&:hover': {
      backgroundColor: `${theme.palette.common.white}`,
      color: theme.palette.text.primary,
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
}));
