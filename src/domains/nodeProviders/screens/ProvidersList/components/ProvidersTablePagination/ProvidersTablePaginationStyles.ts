import { Theme, makeStyles, fade } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },

  fab: {
    color: theme.palette.text.hint,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    textTransform: 'none',
    width: 'auto',
    height: '40px',
    padding: '0 15px',
    minWidth: '40px',
    borderRadius: '20px',

    '&+&': {
      marginLeft: theme.spacing(1),
    },

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },

    '&.Mui-disabled': {
      color: fade(theme.palette.text.primary, 0.2),
      borderColor: fade(theme.palette.text.primary, 0.2),
      backgroundColor: 'transparent',
    },
  },

  isActive: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  },
  dots: {
    margin: '0 6px',
  },
}));
