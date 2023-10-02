import { Dispatch, SetStateAction } from 'react';

import { Snippets } from '../Snippets';
import { Tabs } from '../Tabs';
import { useStyles } from './ConnectionSnippetStyles';
import { Technology } from '../../types';

export interface ConnectionSnippetProps {
  technology: Technology;
  setTechnology: Dispatch<SetStateAction<Technology>>;
  httpCode: string;
  wssCode?: string;
}

export const ConnectionSnippet = ({
  technology,
  setTechnology,
  httpCode,
  wssCode,
}: ConnectionSnippetProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.connectionSnippet}>
      <Tabs setTechnology={setTechnology} />
      <Snippets httpCode={httpCode} wssCode={wssCode} technology={technology} />
    </div>
  );
};
