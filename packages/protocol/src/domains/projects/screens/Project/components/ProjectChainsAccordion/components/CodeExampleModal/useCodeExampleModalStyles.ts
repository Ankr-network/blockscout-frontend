import { makeStyles } from 'tss-react/mui';

export const useCodeExampleModalStyles = makeStyles()(theme => ({
  snippetsDialogPaper: {
    width: 600,
  },
  snippetsDialogTitle: {
    marginBottom: theme.spacing(8),
  },
  chainDescription: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 5),
  },
  codeExampleModalChainLogo: {
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
  chainSnippets: {
    padding: 0,
  },
}));
