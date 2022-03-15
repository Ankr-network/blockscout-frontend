import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { Button } from 'uiKit/Button';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';

import { useTokenVariantStyles } from './useTokenVariantStyles';

const iconsMap = {
  aETHb: AETHBIcon,
  aETHc: AETHCIcon,
};

type TTokenVariantIcon = keyof typeof iconsMap;

interface ITokenVariantProps {
  title: string;
  icon: TTokenVariantIcon;
  isActive?: boolean;
  description?: ReactNode;
  onClick?: () => void;
}

export const TokenVariant = ({
  icon,
  title,
  isActive,
  description,
  onClick,
}: ITokenVariantProps): JSX.Element => {
  const classes = useTokenVariantStyles();

  const Icon = iconsMap[icon];

  return (
    <Button
      fullWidth
      classes={{
        label: classes.label,
      }}
      className={classNames(classes.root, isActive && classes.active)}
      variant="outlined"
      onClick={onClick}
    >
      <Box alignItems="center" component="span" display="flex" mb={1}>
        <Icon className={classes.icon} size="sm" />

        <b>{title}</b>
      </Box>

      <Box component="span" display="block" lineHeight={1.4}>
        {description}
      </Box>
    </Button>
  );
};
