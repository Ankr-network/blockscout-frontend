import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRequestsMapStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: theme.spacing(7.5),
    padding: theme.spacing(7.5),
    borderRadius: theme.spacing(5),
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5),
    },
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: theme.spacing(5),
    lineHeight: theme.spacing(2 * 3.5),
  },

  loading: {
    height: theme.spacing(2 * 26),
  },

  noData: {
    height: theme.spacing(2 * 26),
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },

  mapContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(2 * -3),

    '& path:focus': {
      outline: 'none',
    },
  },
}));
