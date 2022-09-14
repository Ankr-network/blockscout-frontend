import { Theme, makeStyles } from '@material-ui/core';
import { MessageType } from '../../types';

export const useMessageStyles = makeStyles<Theme, MessageType>(theme => ({
  message: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.25),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    flex: 1,

    wordBreak: 'break-all',

    color: theme.palette.action.disabledBackground,

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
  data: type => ({
    padding: theme.spacing(0.5, 1),

    borderRadius: theme.spacing(1),

    wordBreak: 'break-all',

    ...(type === MessageType.Error
      ? {
          backgroundColor: '#D22C6A',

          color: theme.palette.common.white,
        }
      : {
          backgroundColor: `rgba(255, 255, 255, 0.04)`,

          color: theme.palette.text.secondary,
        }),
  }),
}));
