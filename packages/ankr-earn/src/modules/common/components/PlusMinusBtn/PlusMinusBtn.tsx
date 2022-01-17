import { ButtonProps, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Button } from 'uiKit/Button';
import { MinusIcon } from 'uiKit/Icons/MinusIcon';
import { PlusIcon } from 'uiKit/Icons/PlusIcon';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
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
}: IPlusMinusBtnProps) => {
  const classes = usePlusMinusBtnStyles();

  const Icon = iconsMap[icon];

  const button = useMemo(() => {
    const renderedIcon = isLoading ? <Spinner size={24} /> : <Icon size={18} />;
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
  }, [Icon, className, classes.root, disabled, href, isLoading, onClick]);

  return tooltip ? (
    <Tooltip
      className={className}
      open={tooltip ? undefined : false}
      title={tooltip ?? false}
      arrow
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
};
