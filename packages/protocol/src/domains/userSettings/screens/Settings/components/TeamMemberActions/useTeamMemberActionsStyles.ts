import { makeStyles } from 'tss-react/mui';

export const useTeamMemberActionsStyles = makeStyles()(theme => ({
  pendingTeamMemberActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btn: {
    minWidth: '40px',
  },
  copyIcon: {
    boxShadow: 'none',
    overflow: 'visible',
    width: '40px',
    minHeight: 30,
  },
  copyIconContent: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    height: 32,
    minHeight: 32,

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  copyIconMessage: {
    backgroundColor: 'transparent',
    height: 44,
  },
  copyIconText: {
    margin: 0,
    color: theme.palette.text.secondary,
    height: 24,

    '&>svg': {
      color: theme.palette.text.secondary,
    },
  },
}));
