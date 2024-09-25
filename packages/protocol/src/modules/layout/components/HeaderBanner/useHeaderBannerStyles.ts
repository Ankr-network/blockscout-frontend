import { makeStyles } from 'tss-react/mui';

const name = 'HeaderBanner';

export const useHeaderBannerStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 40,
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    top: 0,
    zIndex: 4,

    padding: theme.spacing(3, 7, 4, 3),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2.5, 2.5),
    },
  },
  text: {
    color: theme.palette.common.white,
    textAlign: 'left',

    '& > span > a': {
      color: theme.palette.common.white,
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
