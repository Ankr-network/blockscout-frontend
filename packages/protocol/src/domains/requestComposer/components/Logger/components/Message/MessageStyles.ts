import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { MessageType } from '../../types';

const getColor = (type: MessageType, theme: Theme) => {
  switch (type) {
    case MessageType.Error:
      return theme.palette.error.main;
    case MessageType.Info:
    case MessageType.Success:
      return theme.palette.success.main;
    case MessageType.Input:
    case MessageType.Time:
    default:
      return theme.palette.grey[300];
  }
};

export const useMessageStyles = makeStyles<MessageType>()(
  (theme: Theme, type: MessageType) => ({
    message: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing(2 * 1.25),
      [`& svg.message-icon`]: {
        color: getColor(type, theme),
      },
    },
    body: {
      overflowWrap: 'anywhere',

      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2 * 1),
      flex: 1,

      wordBreak: 'break-all',

      color: theme.palette.common.white,

      fontWeight: 400,
      fontSize: theme.spacing(2 * 1.75),
      lineHeight: theme.spacing(2 * 2.5),
    },
    data: {
      overflowWrap: 'anywhere',

      padding: theme.spacing(2 * 0.5, 2 * 1),

      borderRadius: theme.spacing(2 * 1),

      wordBreak: 'break-all',
      color: theme.palette.common.white,

      ...(type === MessageType.Error
        ? {
            backgroundColor: theme.palette.error.main,
          }
        : {
            backgroundColor: `rgba(255, 255, 255, 0.04)`,
          }),
    },
  }),
);
