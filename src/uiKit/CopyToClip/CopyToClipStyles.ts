import { makeStyles, Theme } from '@material-ui/core';

interface CopyToClipProps {
  isCopied: boolean;
}

export const useStyles = makeStyles<Theme, CopyToClipProps>(theme => ({
  text: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  container: ({ isCopied }) => ({
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 9,
    boxSizing: 'border-box',
    border: '2px solid #F2F5FA',
    cursor: isCopied ? 'default' : 'pointer',
    background: isCopied ? '#fff' : '#F2F5FA',

    '&:hover': {
      background: '#fff',
      border: '2px solid #F2F5FA',

      '& $message': {
        color: theme.palette.text.primary,
      },

      '& $copyIcon': {
        color: theme.palette.text.primary,
      },
    },
  }),

  message: {
    color: theme.palette.text.primary,
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  copyIcon: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
