import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tooltip } from '@material-ui/core';
import { uid } from 'react-uid';
import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { useMarkdownContent } from './useMarkdownContent';
import { useMarkdownContentWrapperStyles } from './MarkdownContentWrapperStyles';
import { GlossaryMappedData } from '../../../glossary/types';

interface IMarkdownContentWrapperProps {
  className?: string;
  messagesList: string[];
  glossaryData: GlossaryMappedData;
}

export const MarkdownContentWrapper = ({
  className,
  messagesList,
  glossaryData,
}: IMarkdownContentWrapperProps) => {
  const classes = useMarkdownContentWrapperStyles();
  const { mappedMessages } = useMarkdownContent(messagesList, glossaryData);

  const components: Components = {
    a: ({ node, ...props }) => {
      let tooltipTitle: string | undefined;

      // TODO: improve glossary data structure
      const {
        children: [key],
      } = props;

      if (typeof key === 'string') {
        const tooltipObject = glossaryData[key.toLowerCase()];
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
