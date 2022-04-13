import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { cloneElement, ReactElement, ReactNode } from 'react';

import { Button } from 'uiKit/Button';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';

import { useTokenVariantStyles } from './useTokenVariantStyles';

interface ITokenVariantProps {
  title: string;
  iconSlot: ReactElement;
  isActive?: boolean;
  isDisabled?: boolean;
  description?: ReactNode;
  onClick?: () => void;
}

export const TokenVariant = ({
  title,
  isActive,
  iconSlot,
  description,
  isDisabled,
  onClick,
}: ITokenVariantProps): JSX.Element => {
  const classes = useTokenVariantStyles();

  return (
    <Button
      fullWidth
      classes={{
        label: classes.label,
      }}
      className={classNames(classes.root, isActive && classes.active)}
      disabled={isDisabled}
      variant="outlined"
      onClick={isActive ? undefined : onClick}
    >
      <Box alignItems="center" component="span" display="flex" mb={1}>
        {cloneElement<ISvgIconProps>(iconSlot, {
          className: classes.icon,
          size: 'sm',
        })}

        <b>{title}</b>
      </Box>

      <Box component="span" display="block" lineHeight={1.4}>
        {description}
      </Box>
    </Button>
  );
};
