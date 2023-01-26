import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { enterpriseColor } from 'uiKit/Theme/themeUtils';

export const useEnterpriseBlockStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.spacing(2 * 5),
    padding: theme.spacing(2 * 5),
    width: '100%',
    marginTop: theme.spacing(2 * 4),
    background: enterpriseColor,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2 * 5, 3.5),
      borderRadius: theme.spacing(2 * 4),
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2 * 3.5),
      flexDirection: 'column',
    },
  },
  container: {
    width: '100%',
  },
  label: {
    color: theme.palette.grey[900],
    fontSize: 20,

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  title: {
    marginTop: theme.spacing(2 * 1),
    fontSize: 35,
    color: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  link: {
    width: 148,
    fontSize: 14,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      color: theme.palette.primary.dark,
      background: theme.palette.secondary.dark,
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: theme.spacing(2 * 3.5),
    },
  },
  subtitle: {
    color: theme.palette.background.paper,
    fontWeight: 400,
  },
}));
