import { makeStyles, Theme } from '@material-ui/core';

interface CopyToClipProps {
  isCopied: boolean;
}

export const useStyles = makeStyles<Theme, CopyToClipProps>(theme => ({
  container: {
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    overflow: 'hidden',
  },
  content: ({ isCopied }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    background: isCopied
      ? theme.palette.common.white
      : theme.palette.background.paper,

    '&:hover': {
      background: theme.palette.common.white,

      '& $button': {
        backgroundColor: theme.palette.primary.dark,
        [theme.breakpoints.down('xs')]: {
          color: theme.palette.common.white,
        },
      },
    },
  }),
  text: {
    color: theme.palette.text.primary,
    padding: '11px 15px',
    width: '60%',
  },
  button: {
    transition: 'none',
    width: '40%',
  },
}));
