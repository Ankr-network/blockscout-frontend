import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import bubbleTailWhite from '../../assets/tailWhite.svg';
import bubbleTailBlack from '../../assets/tailBlack.svg';

export const useMessagesContainerStyles = makeStyles<Theme>(theme => ({
  /* messages */
  messagesWrapper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end' /* avatar is always in the bottom */,
  },
  messagesWrapperStudent: {
    flexDirection: 'row-reverse',
  },
  messagesWrapperText: {
    flexDirection: 'column',
  },
  avatarAnkr: {
    marginRight: theme.spacing(1),
  },
  avatarStudent: {
    marginLeft: theme.spacing(1),
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messagesListStudent: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: 28,
    maxWidth: '452px',
    display: 'inline-flex',

    '& + &': {
      marginTop: theme.spacing(0.5),
    },

    '&:last-child': {
      position: 'relative',
      '&::before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        left: -8,
        bottom: 0,
        backgroundImage: `url(${bubbleTailWhite})`,
        width: 21,
        height: 28,
      },
    },
  },
  messageBubbleStudent: {
    backgroundColor: '#1F2226',
    color: theme.palette.common.white,
    textAlign: 'right',

    '&:last-child': {
      '&::before': {
        left: 'auto',
        right: -5,
        backgroundImage: `url(${bubbleTailBlack})`,
      },
    },
  },

  messageText: {
    '&+&': {
      marginTop: theme.spacing(3),
    },
  },
}));
