import { Ankr } from '@ankr.com/ui';

import { useAnkrNetworkIconStyles } from './useAnkrNetworkIconStyles';

export interface IAnkrNetworkIconProps {
  className?: string;
}

export const AnrkNetworkIcon = ({ className }: IAnkrNetworkIconProps) => {
  const { classes, cx } = useAnkrNetworkIconStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Ankr className={classes.icon} />
    </div>
  );
};
