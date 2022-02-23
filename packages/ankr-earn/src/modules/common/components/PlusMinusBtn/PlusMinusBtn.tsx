import { Box, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo } from 'react';

import { Button } from 'uiKit/Button';
import { MinusIcon } from 'uiKit/Icons/MinusIcon';
import { PlusIcon } from 'uiKit/Icons/PlusIcon';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { Tooltip } from 'uiKit/Tooltip';

import { usePlusMinusBtnStyles } from './usePlusMinusBtnStyles';

const iconsMap = {
  plus: PlusIcon,
  minus: MinusIcon,
};

type IconNameType = keyof typeof iconsMap;

interface IPlusMinusBtnProps {
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  tooltip?: string;
  icon?: IconNameType;
  disabled?: boolean;
  href?: string;
}

export const PlusMinusBtn = ({
  className,
  tooltip,
  onClick,
  icon = 'plus',
  isLoading = false,
  disabled = false,
  href = '',
}: IPlusMinusBtnProps): JSX.Element => {
  const classes = usePlusMinusBtnStyles();

  const Icon = iconsMap[icon];

  const button = useMemo(() => {
    const renderedIcon = isLoading ? (
      <Spinner className={classes.loader} size={18} variant="circle" />
    ) : (
      <Icon className={classes.icon} size={18} />
    );
    const commonBtnProps: Pick<
      ButtonProps,
      'className' | 'disabled' | 'variant'
    > = {
      className: classNames(classes.root, className),
      disabled: isLoading || disabled,
      variant: 'outlined',
    };

    return href ? (
      <NavLink {...commonBtnProps} href={href}>
        {renderedIcon}
      </NavLink>
    ) : (
      <Button
        {...commonBtnProps}
        onClick={isLoading || disabled ? undefined : onClick}
      >
        {renderedIcon}
      </Button>
    );
  }, [Icon, className, classes, disabled, href, isLoading, onClick]);

  return tooltip ? (
    <Tooltip
      arrow
      className={className}
      open={tooltip ? undefined : false}
      title={tooltip ?? false}
    >
      <Box display="inline-flex">{button}</Box>
    </Tooltip>
  ) : (
    button
  );
};
