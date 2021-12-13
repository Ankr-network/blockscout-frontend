import classNames from 'classnames';

import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import { useSpinnerStyles as useStyles } from './useSpinnerStyles';

interface ISpinner {
  centered?: boolean;
  className?: string;
  size?: number;
}

const DEFAULT_SIZE = 80;

export const Spinner = ({
  size = DEFAULT_SIZE,
  centered = true,
  className = '',
}: ISpinner) => {
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
