import React, { Fragment } from 'react';
import { uid } from 'react-uid';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { BlockContentType, Img, ModuleEntityBlockType } from '../../types';
import { MessagesContainer } from '../MessagesContainer';
import { UserActionWrapper } from '../UserActionWrapper';
import { TextContentWrapper } from '../TextContentWrapper';
import { MarkdownContentWrapper } from '../MarkdownContentWrapper';
import { useModuleEntityBlockStyles } from './ModuleEntityBlockStyles';
import { GlossaryMappedData } from '../../../glossary/types';

interface ILessonBlockProps extends ModuleEntityBlockType {
  loadNextBlock: () => void;
  glossaryData: GlossaryMappedData;
}

export const ModuleEntityBlock = ({
  id,
  blockContent,
  userAction,
  loadNextBlock,
  glossaryData,
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
          glossaryData={glossaryData}
          className={classNames(classes.blockWrapper, classes.markdownWrapper)}
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
