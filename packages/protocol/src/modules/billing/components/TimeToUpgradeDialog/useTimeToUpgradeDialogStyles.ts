import { makeStyles } from 'tss-react/mui';

export const useTimeToUpgradeDialogStyles = makeStyles()(theme => ({
  upgradeDialogPaper: {
    width: 600,
    /* hiding scrollbar styles: */
    MsOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    borderRadius: 40,
    position: 'relative',
  },
  bg: {
    position: 'absolute',
    width: 600,
    height: 280,
    top: 0,
    left: 0,
    background:
      'linear-gradient(180deg, rgba(242, 245, 250, 0.00) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)',
  },
  closeButton: {
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    zIndex: 10,
    transition: 'background-color 0.3s',

    '& svg': {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    alignSelf: 'center',
    height: 280,
    width: 280,
    marginTop: theme.spacing(-22),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-15),
    },
  },
  title: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(3),
  },

  listItem: {
    marginTop: theme.spacing(1),
    display: 'inline-flex',
    alignItems: 'center',

    '&:last-of-type': {
      marginBottom: theme.spacing(5),
    },
  },
  checkIcon: {
    marginRight: theme.spacing(1),
  },
  timeToUpgradeBtn: {
    marginTop: theme.spacing(2),
  },
}));
