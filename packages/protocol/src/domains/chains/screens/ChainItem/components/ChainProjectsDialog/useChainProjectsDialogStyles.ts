import { makeStyles } from 'tss-react/mui';

export const useChainProjectsDialogStyles = makeStyles()(theme => ({
  addToProjectsDialogPaper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
  },
  addToProjectsDialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  addToProjectsDialogButton: {
    marginTop: theme.spacing(4),
    alignSelf: 'flex-start',
  },
  chainProjectsDialogDescription: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    padding: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  chainProjectsTitle: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
  chainProjectsSelectAll: {
    width: '100%',
  },
  chainProjectsActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
}));
