import { Dispatch, SetStateAction } from 'react';

import { Snippets } from '../Snippets';
import { SnippetTechnologyTabs } from '../SnippetTechnologyTabs';
import { useStyles } from './ConnectionSnippetStyles';
import { Technology } from '../../types';

export interface ConnectionSnippetProps {
  hasFullWidthSnippets?: boolean;
  technology: Technology;
  setTechnology: Dispatch<SetStateAction<Technology>>;
  httpCode: string;
  wssCode?: string;
  className?: string;
  isTitleHidden?: boolean;
  placeholder?: React.ReactNode;
}

export const ConnectionSnippet = ({
  className,
  hasFullWidthSnippets,
  httpCode,
  isTitleHidden,
  placeholder,
  setTechnology,
  technology,
  wssCode,
}: ConnectionSnippetProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.connectionSnippet, className)}>
      <SnippetTechnologyTabs
        setTechnology={setTechnology}
        isTitleHidden={isTitleHidden}
      />
      {placeholder || (
        <Snippets
          technology={technology}
          hasFullWidthSnippets={hasFullWidthSnippets}
          wssCode={wssCode}
          httpCode={httpCode}
        />
      )}
    </div>
  );
};
