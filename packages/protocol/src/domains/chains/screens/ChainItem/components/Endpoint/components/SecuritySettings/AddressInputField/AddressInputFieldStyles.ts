import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  inputBase: {
    paddingRight: 0,
    borderRadius: 12,
    fontSize: 14,
    height: 44,

    '& input': {
      minHeight: 'auto',
    },

    '& label': { marginBottom: theme.spacing(2 * 2), fontWeight: 700 },
  },
  domain: {
    marginTop: theme.spacing(2 * 2),
    marginBottom: theme.spacing(2 * 3.5),
    '& > p': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  addButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
