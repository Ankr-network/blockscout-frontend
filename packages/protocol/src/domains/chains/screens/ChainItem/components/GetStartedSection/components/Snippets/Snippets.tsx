import { Box } from '@mui/material';

import { EndpointGroup } from 'modules/endpoints/types';

import { CodeSnippet } from '../CodeSnippet';
import { ConnectionType, Technology } from '../../types';
import { useSnippets } from './hooks/useSnippets';
import { useStyles } from './SnippetsStyles';

export interface SnippetsProps {
  group: EndpointGroup;
  technology: Technology;
}

export const Snippets = ({ group, technology }: SnippetsProps) => {
  const { classes } = useStyles();

  const { httpCode, language, wssCode } = useSnippets({ group, technology });

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
