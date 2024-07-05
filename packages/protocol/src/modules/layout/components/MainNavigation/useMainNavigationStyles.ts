import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '100%',
  },
  link: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textDecoration: 'none',
    height: 24,
    width: 38,
    borderBottom: `1px solid ${alpha(theme.palette.link.main, 0.5)}`,

    '&, &:visited': {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  divider: {
    marginTop: 3,
    marginBottom: 3,
  },
  skeleton: {
    height: theme.spacing(6),
    margin: theme.spacing(3),

    borderRadius: theme.spacing(1.5),

    backgroundColor: theme.palette.background.default,
  },
}));
