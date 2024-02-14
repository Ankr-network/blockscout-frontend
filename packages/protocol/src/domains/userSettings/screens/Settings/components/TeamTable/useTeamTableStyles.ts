import { makeStyles } from 'tss-react/mui';

export const useTeamTableStyles = makeStyles()(theme => ({
  groupTable: {
    borderSpacing: theme.spacing(0.25),
  },
  row: {
    verticalAlign: 'baseline',
    boxShadow: `0 1px 0px 0px ${theme.palette.grey[200]}`,
  },
  cell: {
    borderBottom: `none`,
    backgroundColor: 'transparent',
  },
  th: {
    fontWeight: 'normal',
    '&&': {
      padding: theme.spacing(2, 0),
    },
  },
  td: {
    '&&': {
      padding: theme.spacing(4, 1, 4, 0),
    },
  },
  actionsCell: {
    verticalAlign: 'middle',
  },
  roleCell: {
    display: 'flex',
    alignItems: 'center',
  },
  roleTooltip: {
    marginLeft: theme.spacing(),
  },
  questionIcon: {
    color: theme.palette.text.secondary,
  },
  pendingMemberCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
  pendingMemberInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userStatus: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 8,
    padding: theme.spacing(0.5, 1.5),
    lineHeight: 1.3,
  },
  avatar: {
    display: 'inline-flex',
    marginRight: theme.spacing(2),
  },
  avatarPending: {
    border: `2px dashed ${theme.palette.grey[200]}`,
    '&>span': {
      color: theme.palette.text.secondary,
    },
  },
}));
