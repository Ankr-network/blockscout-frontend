import classNames from 'classnames';
import { ReactNode, ReactText } from 'react';

import { useContainerStyles } from './useContainerStyles';

export type TContainerSize = 'lg' | 'xl';

export interface IContainerProps {
  className?: string;
  children?: ReactNode;
  maxWidth?: ReactText;
  size?: TContainerSize;
}

export const Container = ({
  className,
  children,
  maxWidth,
  size = 'lg',
}: IContainerProps): JSX.Element => {
  const classes = useContainerStyles({ maxWidth });
  const isCustomSize = !!maxWidth;

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.sizeCustom]: isCustomSize,
        [classes.sizeLg]: !isCustomSize && size === 'lg',
        [classes.sizeXl]: !isCustomSize && size === 'xl',
      })}
    >
      {children}
    </div>
  );
};
