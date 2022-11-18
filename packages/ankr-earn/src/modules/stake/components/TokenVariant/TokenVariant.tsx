import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { cloneElement, ReactElement, ReactNode } from 'react';

import { Button } from 'uiKit/Button';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';

import { useTokenVariantStyles } from './useTokenVariantStyles';

interface ITokenVariantProps {
  description?: ReactNode;
  iconSlot: ReactElement;
  isActive?: boolean;
  isDisabled?: boolean;
  isUnsupported?: boolean;
  title: string;
  onClick?: () => void;
}

export const TokenVariant = ({
  description,
  iconSlot,
  isActive,
  isDisabled,
  isUnsupported,
  title,
  onClick,
}: ITokenVariantProps): JSX.Element => {
  const classes = useTokenVariantStyles();

  return (
    <Button
      fullWidth
      classes={{
        label: classes.label,
      }}
      className={classNames(
        classes.root,
        isActive && classes.active,
        isUnsupported && classes.unsupported,
      )}
      disabled={isUnsupported || isDisabled}
      variant="outlined"
      onClick={isUnsupported || isActive ? undefined : onClick}
    >
      <Box
        alignItems="center"
        component="span"
        display="flex"
        justifyContent="space-between"
        mb={1}
      >
        <Box alignItems="center" component="span" display="flex">
          {cloneElement<ISvgIconProps>(iconSlot, {
            className: classes.icon,
            size: 'sm',
          })}

          <b>{title}</b>
        </Box>

        {isUnsupported && (
          <Box className={classes.comingSoonLabel} component="span">
            {t('stake.token-variant.coming-soon-label')}
          </Box>
        )}
      </Box>

      <Box component="span" display="block" lineHeight={1.4}>
        {description}
      </Box>
    </Button>
  );
};
