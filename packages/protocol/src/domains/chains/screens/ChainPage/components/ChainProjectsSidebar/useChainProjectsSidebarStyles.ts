import { makeStyles } from 'tss-react/mui';

const menuWidth = 540;

export const useChainProjectsSidebarStyles = makeStyles({
  name: 'ChainProjectsSidebar',
})(theme => ({
  addToProjectsDialogPaper: {
    backgroundImage: 'none',
    width: menuWidth,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8),
    borderRadius: 0,
    paddingBottom: theme.spacing(22),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(38),
    },
  },
  addToProjectsDialogButton: {
    marginTop: theme.spacing(4),
    alignSelf: 'flex-start',
  },
  chainProjectsSelectAll: {
    width: '100%',
  },
  chainProjectsActions: {
    width: menuWidth,
    maxWidth: '100%',
    position: 'fixed',
    bottom: 0,
    paddingTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    right: 0,
    padding: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    gap: theme.spacing(3),
    marginTop: theme.spacing(8),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  selectAllCheckbox: {
    height: 56,
    input: {
      width: '60px',
      height: '56px',
      left: '-28px',
      top: '-18px',
    },
  },
}));
