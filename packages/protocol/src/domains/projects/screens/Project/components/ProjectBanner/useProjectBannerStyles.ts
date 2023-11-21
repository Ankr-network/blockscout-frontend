import { makeStyles } from 'tss-react/mui';

export const useProjectBannerStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.warning.light,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  iconWarning: {
    color: theme.palette.warning.main,
  },
  message: {
    color: 'black',
  },
  closeButton: {
    color: 'black',
    border: 'none',
    marginLeft: 'auto',

    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 0.8,
    },
  },
}));
