import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { uid } from 'react-uid';
import classNames from 'classnames';

import avatarAnkr from '../../../../../../assets/img/Avatar/Ankr.svg';
import avatarStudent from '../../../../../../assets/img/Avatar/Student.svg';
import { MessageBlock, UserType } from '../../types';

import { useMessagesContainerStyles } from './MessagesContainerStyles';

export const MessagesContainer = ({ type, messagesList }: MessageBlock) => {
  const classes = useMessagesContainerStyles();
  const isUser = type === 'student' || type === 'ankr';
  const isStudent = type === 'student';
  const isText = type === 'text';

  const getAvatar = (from: UserType) => {
    switch (from) {
      case 'ankr':
        return (
          <img
            className={classNames(classes.avatar, classes.avatarAnkr)}
            src={avatarAnkr}
            alt="Ankr avatar"
          />
        );
      case 'student':
        return (
          <img
            className={classNames(classes.avatar, classes.avatarStudent)}
            src={avatarStudent}
            alt="Student avatar"
          />
        );
      default:
        throw new Error('wrong user type');
    }
  };

  const renderMessageBubble = (message: string) => {
    return (
      <Typography
        key={uid(message)}
        className={classNames(
          classes.messageBubble,
          isStudent && classes.messageBubbleStudent,
        )}
        variant="body2"
      >
        {message}
      </Typography>
    );
  };

  const renderMessageText = (message: string) => {
    return (
      <Typography
        key={uid(message)}
        className={classes.messageText}
        variant="body2"
      >
        {message}
      </Typography>
    );
  };

  return (
    <Box
      className={classNames(
        classes.messagesWrapper,
        isStudent && classes.messagesWrapperStudent,
        isText && classes.messagesWrapperText,
      )}
    >
      {isUser && (
        <>
          {getAvatar(type)}
          <Box
            className={classNames(
              classes.messagesList,
              isStudent && classes.messagesListStudent,
            )}
          >
            {messagesList.map(renderMessageBubble)}
          </Box>
        </>
      )}

      {/* TODO: remove text messages from this component */}
      {isText && messagesList.map(renderMessageText)}
    </Box>
  );
};
