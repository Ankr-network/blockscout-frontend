import { makeStyles } from 'tss-react/mui';

export const useNotificationsPageStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 942,
    margin: '0 auto',
  },
  titleRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(8),

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(9),
    },
  },
  title: {
    color: theme.palette.text.primary,

    [theme.breakpoints.down('md')]: {
      fontSize: 28,
    },
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  },
  showMoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  showMore: {
    marginTop: theme.spacing(7),
    '&&': {
      border: `2px solid ${theme.palette.common.white}`,
    },
  },
}));
