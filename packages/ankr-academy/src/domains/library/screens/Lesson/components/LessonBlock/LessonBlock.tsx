import React, { Fragment } from 'react';
import { useLessonBlockStyles } from './LessonBlockStyles';
import { BlockContentType, Img, LessonBlockType } from '../../types';
import { uid } from 'react-uid';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';
import { UserActionWrapper } from '../UserActionWrapper/UserActionWrapper';
import { Typography } from '@material-ui/core';

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

  const renderImage = (img: Img) => {
    return (
      <>
        <img className={classes.imgMessage} src={img.src} alt={img.alt} />
        <Typography variant="body2" color="textSecondary" align="center">
          {img.copyright}
        </Typography>
      </>
    );
  };

  const renderMessages = (block: BlockContentType) => {
    if (block.type === 'img') {
      return (
        <Fragment key={uid(id + block.type)}>{renderImage(block.img)}</Fragment>
      );
    }

    // TODO block.type === 'text' here

    return (
      <MessagesContainer
        key={uid(id + block.type)}
        type={block.type}
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
