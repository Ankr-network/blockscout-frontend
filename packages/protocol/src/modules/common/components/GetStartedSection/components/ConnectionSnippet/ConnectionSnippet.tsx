import { Dispatch, SetStateAction } from 'react';

import { Snippets } from '../Snippets';
import { Tabs } from '../Tabs';
import { useStyles } from './ConnectionSnippetStyles';
import { Technology } from '../../types';

export interface ConnectionSnippetProps {
  hasFullWidthSnippets?: boolean;
  technology: Technology;
  setTechnology: Dispatch<SetStateAction<Technology>>;
  httpCode: string;
  wssCode?: string;
}

export const ConnectionSnippet = ({
  hasFullWidthSnippets,
  httpCode,
  setTechnology,
  technology,
  wssCode,
}: ConnectionSnippetProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.connectionSnippet}>
      <Tabs setTechnology={setTechnology} />
      <Snippets
        technology={technology}
        hasFullWidthSnippets={hasFullWidthSnippets}
        wssCode={wssCode}
        httpCode={httpCode}
      />
    </div>
  );
};
