import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useAdvancedApiLinksStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  links: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(4),
  },
  link: {
    borderBottom: `1px solid ${alpha(theme.palette.link.main, 0.5)}`,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none',
    },
  },
  iconRoot: {
    height: 32,
    width: 32,
    borderRadius: 12,
  },
  icon: {
    height: 20,
    width: 20,
    color: theme.palette.primary.main,
  },
}));
