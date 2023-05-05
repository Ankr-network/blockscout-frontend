import { makeStyles } from 'tss-react/mui';

export const useRoleStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    minHeight: theme.spacing(27),
    marginBottom: theme.spacing(4),
    borderRadius: 30,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(6),
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(6),
      width: '100%',
    },
  },
  team: {
    color: theme.palette.text.primary,
    width: theme.spacing(50),
    marginRight: theme.spacing(10),
  },
  role: {
    width: theme.spacing(55),
    height: theme.spacing(12),
    borderRadius: 17,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    padding: theme.spacing(0, 4),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  roleText: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  removeButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
