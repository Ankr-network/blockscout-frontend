import { cloneElement } from 'react';

import { Button, IButtonProps } from 'uiKit/Button';
import { PlusIcon } from 'uiKit/Icons/PlusIcon';

import { useAddTokenBtnStyles } from './useAddTokenBtnStyles';

interface IAddTokenBtnProps
  extends Omit<IButtonProps, 'children' | 'className' | 'variant'> {
  iconSlot: JSX.Element;
  token: string;
}

export const AddTokenBtn = ({
  iconSlot,
  token,
  ...restBtnProps
}: IAddTokenBtnProps): JSX.Element => {
  const classes = useAddTokenBtnStyles();

  return (
    <Button {...restBtnProps} className={classes.root} variant="outlined">
      {cloneElement(iconSlot, { className: classes.tokenIcon })}

      {token}

      <PlusIcon className={classes.plusIcon} htmlColor="inherit" />
    </Button>
  );
};
