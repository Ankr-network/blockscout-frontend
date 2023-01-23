import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { MessageType } from '../../types';

export const useMessageStyles = makeStyles<MessageType>()(
  (theme: Theme, type: MessageType) => ({
    message: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing(2 * 1.25),
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

      ...(type === MessageType.Error
        ? {
            backgroundColor: theme.palette.error.main,

            color: theme.palette.common.white,
          }
        : {
            backgroundColor: `rgba(255, 255, 255, 0.04)`,

            color: theme.palette.text.secondary,
          }),
    },
  }),
);
