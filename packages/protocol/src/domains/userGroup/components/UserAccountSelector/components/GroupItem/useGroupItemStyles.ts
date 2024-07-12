import { makeStyles } from 'tss-react/mui';

export const useGroupItemStyles = makeStyles()(theme => ({
  menuItem: {
    width: '100%',
    padding: theme.spacing(2),
    paddingRight: theme.spacing(3),

    borderRadius: 14,

    letterSpacing: '-0.01em',

    color: theme.palette.grey[900],

    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',

    '&&': {
      textAlign: 'left',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      height: 'auto',
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[100],
    },
  },
  check: {
    marginLeft: 'auto',
    fontSize: 24,
    '&&': {
      color: theme.palette.primary.main,
    },
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(3),
    flexShrink: 0,
  },
  groupInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  userName: {
    overflow: 'hidden',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
  },
  label: {
    marginLeft: 0,
    marginRight: theme.spacing(1),
    marginBottom: 0,
    fontSize: 9,
    height: 16,
    lineHeight: '12px',
    fontWeight: 500,
    borderRadius: 4,
  },
  divider: {
    marginRight: theme.spacing(1),
  },
}));
