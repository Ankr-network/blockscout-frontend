import { EndpointGroup } from 'modules/endpoints/types';
import { Snippets } from '../Snippets';
import { Tabs } from '../Tabs';
import { useStyles } from './ConnectionSnippetStyles';
import { useTechnology } from './hooks/useTechnology';

export interface ConnectionSnippetProps {
  group: EndpointGroup;
}

export const ConnectionSnippet = ({ group }: ConnectionSnippetProps) => {
  const [technology, setTechnology] = useTechnology();

  const classes = useStyles();

  return (
    <div className={classes.connectionSnippet}>
      <Tabs setTechnology={setTechnology} />
      <Snippets group={group} technology={technology} />
    </div>
  );
};
