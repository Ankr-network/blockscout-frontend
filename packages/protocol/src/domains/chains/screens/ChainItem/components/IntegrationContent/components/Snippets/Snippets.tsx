import React from 'react';
import { Box } from '@material-ui/core';

import { CodeSnippet } from '../CodeSnippet';
import { ConnectionType, Technology } from '../../types';
import { useSnippets } from './hooks/useSnippets';
import { useStyles } from './SnippetsStyles';

export interface SnippetsProps {
  technology: Technology;
}

export const Snippets = ({ technology }: SnippetsProps) => {
  const classes = useStyles();

  const { httpCode, language, wssCode } = useSnippets(technology);

  return (
    <Box className={classes.snippets}>
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
