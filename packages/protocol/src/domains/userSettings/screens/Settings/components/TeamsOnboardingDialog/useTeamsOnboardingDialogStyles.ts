import { makeStyles } from 'tss-react/mui';

export const useTeamsOnboardingDialogStyles = makeStyles()(theme => ({
  root: {
    width: 600,
    height: 539,

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
  },
  image: {
    width: 450,
    height: 300,
    zIndex: 10,
    marginTop: theme.spacing(-27),
    marginLeft: theme.spacing(10),
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  link: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    padding: 0,
    fontWeight: 400,

    '&&': {
      display: 'inline-flex',
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
  },
}));
