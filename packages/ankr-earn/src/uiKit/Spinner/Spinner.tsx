import classNames from 'classnames';

import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import { useStyles } from './useSpinnerStyles';

interface ISpinnerProps {
  centered?: boolean;
  className?: string;
  size?: number;
}

const DEFAULT_SIZE = 80;

export const Spinner = ({
  size = DEFAULT_SIZE,
  centered = true,
  className = '',
}: ISpinnerProps) => {
  const classes = useStyles({ size });

  return (
    <SpinnerIcon
      className={classNames(
        classes.root,
        centered && classes.centered,
        className,
      )}
    />
  );
};
