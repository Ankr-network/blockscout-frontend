import React, { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tooltip, Typography } from '@material-ui/core';
import { uid } from 'react-uid';
import { glossaryMock } from 'domains/glossary/glossaryMock';
import { mapMessagesList } from './MarkdownContentWrapperUtils';

import { useMarkdownContentWrapperStyles } from './MarkdownContentWrapperStyles';

interface IMarkdownContentWrapperProps {
  className?: string;
  messagesList: string[];
}

export const MarkdownContentWrapper = ({
  className,
  messagesList,
}: IMarkdownContentWrapperProps) => {
  const classes = useMarkdownContentWrapperStyles();
  const [mappedMessages, setMappedMessages] = useState<string[]>([]);
  useEffect(() => {
    setMappedMessages(mapMessagesList(messagesList));
  }, [messagesList]);

  const components: Components = {
    a: ({ node, ...props }) => {
      let tooltipTitle: string | undefined;

      // TODO: improve glossary data structure
      const key = props.children[0];
      if (typeof key === 'string') {
        const tooltipObject = glossaryMock[key.toLowerCase()];
        tooltipTitle = tooltipObject?.value;

        // if tooltip data found render the tooltip component
        if (tooltipTitle) {
          return (
            <Tooltip
              placement="top"
              title={<ReactMarkdown>{tooltipTitle}</ReactMarkdown>}
              // TODO: redirect to glossary item
              onClick={() => console.log(tooltipObject.id)}
            >
              <Typography
                className={classes.glossary}
                paragraph={false}
                variant="body2"
                component="span"
              >
                {props.children}
              </Typography>
            </Tooltip>
          );
        }
      }

      return (
        <a target="blank" {...props}>
          {props.children}
        </a>
      );
    },
  };

  return (
    <div className={className}>
      {mappedMessages.map(message => {
        return (
          <ReactMarkdown
            key={uid(message)}
            className={classes.messageMarkdown}
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {message}
          </ReactMarkdown>
        );
      })}
    </div>
  );
};
