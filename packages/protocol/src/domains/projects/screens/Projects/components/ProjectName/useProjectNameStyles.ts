import { makeStyles } from 'tss-react/mui';

export const useProjectNameStyles = makeStyles()(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    color: theme.palette.text.primary,
    display: 'block',
  },
  endpoint: {
    boxShadow: 'none',

    '& div': {
      backgroundColor: 'transparent',
      flexDirection: 'row-reverse',
      height: theme.spacing(6),
      minHeight: theme.spacing(6),
      padding: 0,
    },

    '& svg': {
      color: theme.palette.grey[600],
    },

    '& span': {
      marginLeft: 0,
      color: theme.palette.grey[600],
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.35,
    },
  },
  text: {
    visibility: 'hidden',
  },
  message: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    padding: 0,
    height: theme.spacing(6),
  },
  button: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0, 1),
    minWidth: theme.spacing(6),
    minHeight: theme.spacing(6),
    width: theme.spacing(6),
    height: theme.spacing(6),

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
}));
