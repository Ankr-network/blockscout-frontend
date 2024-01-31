import { makeStyles } from 'tss-react/mui';

export const useUserGroupItemStyles = makeStyles()(theme => ({
  accordion: {
    padding: theme.spacing(5, 6),
  },
  summaryContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  groupInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    flexShrink: 0,

    span: {
      fontSize: 20,
    },
  },
  checkIcon: {
    position: 'absolute',
    display: 'block',
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    right: 0,
    top: 0,
    color: theme.palette.common.white,
  },
  groupActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  moreButton: {
    minWidth: 40,
    width: 40,
    height: 40,
    padding: theme.spacing(3),

    '& svg': {
      width: 24,
      height: 24,
    },
  },
  expandIcon: {
    color: theme.palette.primary.main,
  },
}));
