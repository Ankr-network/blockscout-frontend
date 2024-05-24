import { makeStyles } from 'tss-react/mui';

export const useHeaderBannerStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    top: 0,
    zIndex: 4,
  },
  text: {
    color: theme.palette.common.white,

    '& > span > span': {
      textDecoration: 'underline',

      '&:hover': {
        cursor: 'pointer',
      },
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
}));
