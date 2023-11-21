import { uid } from 'react-uid';

import { useGraphStyles } from './useGraphStyles';

export interface GraphProps {
  filled: number;
  limit: number;
}

export const Graph = ({ filled, limit }: GraphProps) => {
  const { classes, cx } = useGraphStyles();

  const elements = new Array(limit).fill('').map((_, index) => index + 1);

  return (
    <div className={classes.root}>
      {elements.map((element, index) => (
        <div
          key={uid(element)}
          className={cx(classes.item, { [classes.filled]: index < filled })}
        />
      ))}
    </div>
  );
};
