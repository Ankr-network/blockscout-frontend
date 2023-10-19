import { uid } from 'react-uid';

import { useGraphStyles } from './useGraphStyles';

interface IGraphProps {
  filled: number;
  limit: number;
}

export const Graph = ({ filled, limit }: IGraphProps) => {
  const { classes, cx } = useGraphStyles();

  const elements = new Array(limit).fill('').map((_, index) => index + 1);

  return (
    <div className={classes.root}>
      {elements.map((element, index) => (
        <div
          key={uid(element)}
          className={cx(classes.item, index < filled && classes.filled)}
        />
      ))}
    </div>
  );
};
