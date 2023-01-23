import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRequestsMapStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: theme.spacing(2 * 3.75),

    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(2 * 2),
    },

    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(2 * 2),

      padding: theme.spacing(2 * 2.5),

      borderRadius: theme.spacing(2 * 2.5),
    },
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2.5),
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
