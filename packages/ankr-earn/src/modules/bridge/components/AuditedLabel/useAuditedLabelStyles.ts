import { makeStyles } from '@material-ui/core';

export const useAuditedLabelStyles = makeStyles(theme => ({
  audited: {
    backgroundColor: 'none',
    color: theme.palette.grey[500],
    padding: 0,
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',

    display: 'flex',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    marginRight: 'auto',
    width: 180,

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
  },
}));
