import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tooltip } from '@material-ui/core';
import { uid } from 'react-uid';
import { glossaryMock } from 'domains/glossary/glossaryMock';
import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { mapMessagesList } from './MarkdownContentWrapperUtils';

import { useMarkdownContentWrapperStyles } from './MarkdownContentWrapperStyles';

interface IMarkdownContentWrapperProps {
  className?: string;
  messagesList: string[];
}

// flag is used for automatic finding and wrapping glossary terms inside texts
const IS_AUTOMATIC_GLOSSARY_TERMS_WRAPPING_AVAILABLE = false;

export const MarkdownContentWrapper = ({
  className,
  messagesList,
}: IMarkdownContentWrapperProps) => {
  const classes = useMarkdownContentWrapperStyles();
  const [mappedMessages, setMappedMessages] = useState<string[]>([]);
  useEffect(() => {
    if (IS_AUTOMATIC_GLOSSARY_TERMS_WRAPPING_AVAILABLE) {
      setMappedMessages(mapMessagesList(messagesList));
    } else {
      setMappedMessages(messagesList);
    }
  }, [messagesList]);

  const components: Components = {
    a: ({ node, ...props }) => {
      let tooltipTitle: string | undefined;

      // TODO: improve glossary data structure
      const {
        children: [key],
      } = props;

      if (typeof key === 'string') {
        const tooltipObject = glossaryMock[key.toLowerCase()];
        tooltipTitle = tooltipObject?.value;

        // if tooltip data found render the tooltip component
        if (tooltipTitle) {
          return (
            <Tooltip
              placement="top"
              title={<ReactMarkdown>{tooltipTitle}</ReactMarkdown>}
            >
              <Link
                className={classes.glossaryLink}
                target="_blank"
                rel="noopener noreferrer"
                to={GlossaryRouterConfig.glossaryTerm.generatePath(
                  tooltipObject.termId,
                )}
              >
                <span className={classes.glossary}>{props.children}</span>
              </Link>
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
