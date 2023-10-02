import { Box } from '@mui/material';

import { CodeSnippet } from '../CodeSnippet';
import { ConnectionType, Technology } from '../../types';
import { useStyles } from './SnippetsStyles';
import { languagesMap } from './const';

export interface SnippetsProps {
  technology: Technology;
  httpCode: string;
  wssCode?: string;
}

export const Snippets = ({ httpCode, wssCode, technology }: SnippetsProps) => {
  const { classes } = useStyles();

  const language = languagesMap[technology];

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
