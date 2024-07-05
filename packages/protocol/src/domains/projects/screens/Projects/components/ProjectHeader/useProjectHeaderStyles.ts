import { makeStyles } from 'tss-react/mui';

export const useProjectHeaderStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,

    '&&': {
      padding: 0,
    },

    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',

      '& svg': {
        color: theme.palette.text.primary,
      },
    },
  },
  linkOnBoarding: {
    gap: 8,
    '&:before': {
      content: '""',
      width: 4,
      height: 4,
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[500],
    },
  },
}));
