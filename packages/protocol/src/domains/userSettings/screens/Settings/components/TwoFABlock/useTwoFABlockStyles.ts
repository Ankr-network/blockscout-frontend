import { makeStyles } from 'tss-react/mui';

export const useTwoFABlockStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(7.5),
    borderRadius: 30,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    marginRight: theme.spacing(3),
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    height: theme.spacing(6),
    padding: theme.spacing(0, 2, 0, 1),
    marginRight: theme.spacing(3),

    '& svg': {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  off: {
    color: theme.palette.error.main,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(5),
    marginTop: theme.spacing(8),
    color: theme.palette.grey[800],
    border: `2px solid ${theme.palette.warning.main}`,
    padding: theme.spacing(5),
    borderRadius: 30,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: '50%',
    backgroundColor: theme.palette.warning.light,
    flexShrink: 0,
    marginRight: theme.spacing(5),

    '& svg': {
      color: theme.palette.warning.main,
    },
  },
  text: {
    fontSize: 16,
    lineheight: '24px',
    fontWeight: 600,
  },
  button: {
    flexShrink: 0,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
