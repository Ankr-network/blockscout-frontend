import { Box } from '@mui/material';

import { CodeSnippet } from '../CodeSnippet';
import { ConnectionType, Technology } from '../../types';
import { useStyles } from './SnippetsStyles';
import { languagesMap } from './const';

export interface SnippetsProps {
  technology: Technology;
  hasFullWidthSnippets?: boolean;
  httpCode: string;
  wssCode?: string;
}

export const Snippets = ({
  technology,
  hasFullWidthSnippets,
  httpCode,
  wssCode,
}: SnippetsProps) => {
  const { classes, cx } = useStyles();

  const language = languagesMap[technology];

  return (
    <Box
      className={cx(classes.snippets, {
        [classes.snippetsFullWidth]: hasFullWidthSnippets,
      })}
    >
      <CodeSnippet
        code={httpCode}
        language={language}
        type={ConnectionType.HTTP}
      />
      {wssCode && (
        <CodeSnippet
          code={wssCode}
          language={language}
          type={ConnectionType.WSS}
        />
      )}
    </Box>
  );
};
