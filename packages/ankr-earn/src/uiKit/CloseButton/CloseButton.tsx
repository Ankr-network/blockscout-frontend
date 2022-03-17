import { Button } from 'uiKit/Button';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import { useCloseButtonStyles } from './useCloseButtonStyles';

interface ICloseButtonProps {
  href?: string;
  onClose?: () => void;
}

export const CloseButton = ({
  href,
  onClose,
}: ICloseButtonProps): JSX.Element => {
  const classes = useCloseButtonStyles();

  const CloseBtn = href ? NavLink : Button;

  return (
    <CloseBtn
      className={classes.root}
      href={href ?? ''}
      variant="outlined"
      onClick={onClose}
    >
      <CloseIcon htmlColor="inherit" size="xxs" />
    </CloseBtn>
  );
};
