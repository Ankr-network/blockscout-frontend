import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTronAboutStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2 * 3.75),
  },
  about: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: theme.spacing(2 * 3),
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(8),
  },
  link: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    color: theme.palette.primary.main,
    marginLeft: '1em',
    '&&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
