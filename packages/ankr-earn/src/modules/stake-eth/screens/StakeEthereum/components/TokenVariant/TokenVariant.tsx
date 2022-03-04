import classNames from 'classnames';

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
  onClick?: () => void;
}

export const TokenVariant = ({
  icon,
  title,
  isActive,
  onClick,
}: ITokenVariantProps): JSX.Element => {
  const classes = useTokenVariantStyles();

  const Icon = iconsMap[icon];

  return (
    <Button
      className={classNames(classes.root, isActive && classes.active)}
      variant="outlined"
      onClick={onClick}
    >
      <Icon className={classes.icon} size="sm" />

      {title}
    </Button>
  );
};
