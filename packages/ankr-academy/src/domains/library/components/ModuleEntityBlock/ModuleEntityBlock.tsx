import React, { Fragment } from 'react';
import { uid } from 'react-uid';
import { Typography } from '@material-ui/core';

import { BlockContentType, Img, ModuleEntityBlockType } from '../../types';
import { MessagesContainer } from '../MessagesContainer';
import { UserActionWrapper } from '../UserActionWrapper';
import { TextContentWrapper } from '../TextContentWrapper';
import { MarkdownContentWrapper } from '../MarkdownContentWrapper';
import { useModuleEntityBlockStyles } from './ModuleEntityBlockStyles';

interface ILessonBlockProps extends ModuleEntityBlockType {
  loadNextBlock: () => void;
}

export const ModuleEntityBlock = ({
  id,
  blockContent,
  userAction,
  loadNextBlock,
}: ILessonBlockProps) => {
  const classes = useModuleEntityBlockStyles();

  const renderImage = ({ src, alt, copyright }: Img) => {
    return (
      <Fragment key={uid(src)}>
        <img className={classes.imgMessage} src={src} alt={alt} />
        <Typography variant="body2" color="textSecondary" align="center">
          {copyright}
        </Typography>
      </Fragment>
    );
  };

  const renderMessages = (block: BlockContentType) => {
    const { type } = block;
    const key = uid(id + type);

    if (type === 'img') {
      return (
        <div key={key} className={classes.blockWrapper}>
          {renderImage(block.img)}
        </div>
      );
    }

    if (type === 'text') {
      return (
        <TextContentWrapper
          key={key}
          className={classes.blockWrapper}
          messagesList={block.messagesList}
        />
      );
    }

    if (type === 'markdown') {
      return (
        <MarkdownContentWrapper
          key={key}
          className={classes.blockWrapper}
          messagesList={block.messagesList}
        />
      );
    }

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
      {blockContent && blockContent.map(renderMessages)}

      <UserActionWrapper
        userAction={userAction}
        loadNextBlock={loadNextBlock}
      />
    </>
  );
};
