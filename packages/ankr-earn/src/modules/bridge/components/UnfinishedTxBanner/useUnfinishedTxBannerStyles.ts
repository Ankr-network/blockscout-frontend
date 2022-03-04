import { makeStyles } from '@material-ui/core';

export const useUnfinishedTxBannerStyles = makeStyles(theme => ({
  content: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(2, 2),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto 160px',
    },
  },

  contentList: {
    display: 'grid',
    gap: theme.spacing(0.5, 0),
  },

  title: {
    fontWeight: 'bold',
  },

  txText: {
    color: theme.palette.text.secondary,
    display: 'grid',
    gridTemplateColumns: '40px 175px',
    alignItems: 'flex-end',
  },
}));
