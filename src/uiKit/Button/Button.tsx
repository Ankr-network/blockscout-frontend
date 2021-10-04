import React from 'react';
import { Button as ButtonBase, ButtonProps } from '@material-ui/core';

export const Button = ({ className, ...rest }: ButtonProps) => {
  return <ButtonBase {...rest} />;
};
