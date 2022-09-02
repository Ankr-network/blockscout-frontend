import classNames from 'classnames';

import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useCloseButtonStyles } from './useCloseButtonStyles';

interface ICloseButtonProps {
  href?: string;
  className?: string;
  isAbsoluteRight?: boolean;
  onClose?: () => void;
}

export const CloseButton = ({
  href = '',
  className = '',
  isAbsoluteRight = true,
  onClose,
}: ICloseButtonProps): JSX.Element => {
  const classes = useCloseButtonStyles();

  const CloseBtn = href ? NavLink : Button;

  return (
    <CloseBtn
      className={classNames(classes.root, className, {
        [classes.absoluteRight]: isAbsoluteRight,
      })}
      href={href}
      variant="outlined"
      onClick={onClose}
    >
      <CloseIcon htmlColor="inherit" size="xxs" />
    </CloseBtn>
  );
};
