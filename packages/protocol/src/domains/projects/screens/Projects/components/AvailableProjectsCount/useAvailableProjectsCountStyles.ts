import { makeStyles } from 'tss-react/mui';

export const useAvailableProjectsCountStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  infoIcon: {
    color: theme.palette.text.secondary,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
