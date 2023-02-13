import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSupportBlockStyles = makeStyles()((theme: Theme) => ({
  contactBlock: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: 405,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2 * 12),
      flexDirection: 'column',
    },
  },
  contactBlockHeader: {
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  contactBlockBtn: {
    marginLeft: theme.spacing(2 * 5),
    backgroundColor: theme.palette.background.paper,
    color: '#5865F2',
    fontSize: 14,
    '&:hover': {
      backgroundColor: `${theme.palette.background.paper}`,
      color: theme.palette.text.primary,
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2 * 2),
      marginLeft: 0,
    },
  },
}));
