import React from 'react';
import { useTextContentWrapperStyles } from './TextContentWrapperStyles';
import { Typography } from '@material-ui/core';
import { uid } from 'react-uid';
import linkifyHtml from 'linkify-html';

const linkifyOptions = {
  target: '_blank',
};

interface ITextContentWrapperProps {
  className?: string;
  messagesList: string[];
}

export const TextContentWrapper = ({
  className,
  messagesList,
}: ITextContentWrapperProps) => {
  const classes = useTextContentWrapperStyles();

  return (
    <div className={className}>
      {messagesList.map(message => {
        return (
          <Typography
            key={uid(message)}
            className={classes.messageText}
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: linkifyHtml(message, linkifyOptions),
            }}
          />
        );
      })}
    </div>
  );
};
