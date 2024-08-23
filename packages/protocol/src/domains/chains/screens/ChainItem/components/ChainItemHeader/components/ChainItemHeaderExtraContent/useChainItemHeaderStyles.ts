import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderExtraContentStyles = makeStyles()(theme => ({
  extraContent: {
    paddingRight: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    overflow: 'visible',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  codeExampleButton: {
    minHeight: 30,
    height: 30,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  addNetworkButton: {
    '&&': {
      backgroundColor: theme.palette.background.paper,
      height: 32,
      width: 32,
      minWidth: 32,
      minHeight: 32,
      padding: 0,
      borderRadius: theme.spacing(3),

      '& > svg': {
        height: 20,
        width: 20,
      },
    },
    display: 'flex',

    '&:hover': {
      '&&': {
        backgroundColor: theme.palette.background.default,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
    },
  },

  docsLink: {
    width: 'auto',
    minWidth: 30,
    minHeight: 30,
    height: 30,
    gap: 0,
    padding: theme.spacing(0, 2),
    '&&': {
      borderRadius: theme.spacing(3),
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'inline-flex',
    },
  },
}));
