import React, { Fragment } from 'react';
import { uid } from 'react-uid';
import { Typography } from '@material-ui/core';

import { BlockContentType, Img, LessonBlockType } from '../../types';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';
import { UserActionWrapper } from '../UserActionWrapper/UserActionWrapper';
import { useLessonBlockStyles } from './LessonBlockStyles';

interface ILessonBlockProps extends LessonBlockType {
  loadNextBlock: () => void;
}

export const LessonBlock = ({
  id,
  blockContent,
  userAction,
  loadNextBlock,
}: ILessonBlockProps) => {
  const classes = useLessonBlockStyles();

  const renderImage = ({ src, alt, copyright }: Img) => {
    return (
      <>
        <img className={classes.imgMessage} src={src} alt={alt} />
        <Typography variant="body2" color="textSecondary" align="center">
          {copyright}
        </Typography>
      </>
    );
  };

  const renderMessages = (block: BlockContentType) => {
    const { type } = block;
    const key = uid(id + block.type);

    if (type === 'img') {
      return <Fragment key={key}>{renderImage(block.img)}</Fragment>;
    }

    // TODO block.type === 'text' here

    return (
      <MessagesContainer
        key={key}
        type={type}
        messagesList={block.messagesList}
      />
    );
  };

  return (
    <>
      {blockContent.map(renderMessages)}

      <UserActionWrapper
        userAction={userAction}
        loadNextBlock={loadNextBlock}
      />
    </>
  );
};
