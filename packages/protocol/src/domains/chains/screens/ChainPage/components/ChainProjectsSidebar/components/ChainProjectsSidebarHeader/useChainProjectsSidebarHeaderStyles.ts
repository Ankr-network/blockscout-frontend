import { makeStyles } from 'tss-react/mui';

export const useChainProjectsSidebarHeaderStyles = makeStyles({
  name: 'ChainProjectsSidebarHeader',
})(theme => ({
  chainNavbarHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  closeButton: {
    minWidth: 40,
    width: 40,
    color: theme.palette.text.secondary,
  },
  chainProjectsDialogDescription: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    padding: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  chainProjectsTitle: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
