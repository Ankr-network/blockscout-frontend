import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  link: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: theme.spacing(2 * 2),
    background: 'transparent',

    '&:hover': {
      color: theme.palette.primary.main,
    },

    padding: 10,
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: '50%',
    minWidth: 36,
    height: 36,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    transform: 'rotate(180deg)',
    color: theme.palette.grey[500],
    fontSize: 12,
  },
  text: {
    fontSize: 34,
  },
}));
