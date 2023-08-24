import { makeStyles } from 'tss-react/mui';

export const useHelperLinkStyles = makeStyles()(theme => ({
  helperLinkRoot: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(6),
    padding: theme.spacing(6, 6, 6, 6),
    width: 280,
    justifyContent: 'space-between',
    fontWeight: 700,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      height: `calc(100% - ${theme.spacing(4)})`,
      width: theme.spacing(),
      borderRadius: '2px',
      backgroundColor: theme.palette.primary.main,
      left: theme.spacing(3),
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.primary.main,
    },
  },
  externalLinkIcon: {
    '&&': {
      width: 24,
      height: 24,
      color: theme.palette.primary.main,
    },
  },
}));
