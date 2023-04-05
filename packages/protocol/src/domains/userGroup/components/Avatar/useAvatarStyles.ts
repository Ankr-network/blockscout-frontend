import { makeStyles } from 'tss-react/mui';

export const useAvatarStyles = makeStyles<string>()((_theme, avatarColor) => ({
  root: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: avatarColor,
  },
  avatarTitle: {
    textTransform: 'uppercase',
  },
}));
