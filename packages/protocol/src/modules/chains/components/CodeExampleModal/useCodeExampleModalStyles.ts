import { makeStyles } from 'tss-react/mui';

export const useCodeExampleModalStyles = makeStyles()(theme => ({
  snippetsDialogPaper: {
    width: 600,
  },
  snippetsDialogTitle: {
    marginBottom: theme.spacing(8),

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
    },
  },
  chainDescription: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 5),
  },
  codeExampleModalChainLogo: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '50%',
    width: 32,
    height: 32,
    marginRight: theme.spacing(3),
  },
  chainSelectorControls: {
    borderBottom: 'none',
    marginTop: theme.spacing(3),
    paddingBottom: 0,
    '& div': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  chainSelectorContent: {
    '&&': {
      width: '100%',
      flexWrap: 'wrap',
    },
  },
  chainSnippets: {
    padding: 0,
  },
}));
