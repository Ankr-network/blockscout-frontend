import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  agreementText: {
    '&': {
      display: 'inline-flex',
      paddingLeft: theme.spacing(2 * 1),
      lineHeight: 1.5,
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 210,
    },
  },

  text: {
    fontSize: 17,
    fontWeight: 600,
  },
  httpAddress: {
    '& label': { marginBottom: theme.spacing(2 * 2), fontWeight: 700 },
  },
  inputBase: {
    backgroundColor: theme.palette.background.paper,
  },
  pasteButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
