import { makeStyles } from 'tss-react/mui';

export const useInviteeRoleSelectorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: theme.palette.grey[900],
  },
  description: {
    color: theme.palette.text.secondary,

    fontWeight: 500,
  },
  selectedIcon: {
    color: theme.palette.primary.main,

    fontSize: 24,
  },
}));
