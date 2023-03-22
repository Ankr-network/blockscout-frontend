import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useAvatarStyles = makeStyles<string>()(
  (theme: Theme, avatarColor: string) => ({
    root: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: avatarColor,
    },
    avatarTitle: {
      textTransform: 'uppercase',
    },
  }),
);
