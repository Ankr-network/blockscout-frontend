import { Snippets } from '../Snippets';
import { Tabs } from '../Tabs';
import { useTechnology } from './hooks/useTechnology';
import { useStyles } from './ConnectionSnippetStyles';

export const ConnectionSnippet = () => {
  const [technology, setTechnology] = useTechnology();

  const classes = useStyles();

  return (
    <div className={classes.connectionSnippet}>
      <Tabs setTechnology={setTechnology} />
      <Snippets technology={technology} />
    </div>
  );
};
