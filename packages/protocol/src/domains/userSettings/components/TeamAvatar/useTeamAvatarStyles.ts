import { makeStyles } from 'tss-react/mui';

export const useTeamAvatarStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 48,
    height: 48,

    borderRadius: '50%',

    backgroundColor: theme.palette.purple.main,
  },
  icon: {
    color: theme.palette.common.white,

    fontSize: 28,

    path: {
      fill: theme.palette.common.white,
    },
  },
}));
