import classNames from 'classnames';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';
import { ReactComponent as ViciousCircleIcon } from './assets/vicious-circle.svg';
import { useSpinnerStyles } from './useSpinnerStyles';

const spinnerIconsMap = {
  viciousCircle: ViciousCircleIcon,
  circle: SpinnerIcon,
};

export type TSpinnerIconType = keyof typeof spinnerIconsMap;

export interface ISpinnerProps {
  centered?: boolean;
  className?: string;
  size?: number;
  variant?: TSpinnerIconType;
}

const DEFAULT_SIZE = 80;

export const Spinner = ({
  size = DEFAULT_SIZE,
  centered = false,
  className = '',
  variant = 'viciousCircle',
}: ISpinnerProps) => {
  const classes = useSpinnerStyles({ size });
  const IconComponent = spinnerIconsMap[variant] || 'span';

  return (
    <IconComponent
      className={classNames(
        classes.root,
        centered && classes.centered,
        className,
      )}
    />
  );
};
