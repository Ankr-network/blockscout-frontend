import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: theme.spacing(2 * 0, 2 * 3.5),
  },
  title: {
    color: theme.palette.common.white,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
  clearButton: {
    overflow: 'visible',

    padding: 0,
    minWidth: 'auto',

    '&&': {
      border: 'none',
      boxShadow: 'none',
      minHeight: 14,
      height: 14,
    },

    transition: 'color .3s, background-color .3s',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
