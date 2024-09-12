import { More } from '@ankr.com/ui';
import { ButtonBase, ButtonProps, Menu, MenuProps } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useMenuButtonStyles } from './useMenuButtonStyles';

export type MenuButtonProps = Pick<
  MenuProps,
  'children' | 'anchorEl' | 'open' | 'classes'
> & {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonProps?: ButtonProps;
  onClose: () => void;
  iconMoreClassName?: string;
};

export const MenuButton = (props: MenuButtonProps) => {
  const {
    buttonProps = {},
    iconMoreClassName,
    onOpen,
    open,
    ...menuProps
  } = props;
  const { isLightTheme } = useThemes();

  const { classes, cx } = useMenuButtonStyles({
    isOpened: open,
    isLightTheme,
  });

  return (
    <>
      <ButtonBase
        {...buttonProps}
        className={cx(classes.menuButton, buttonProps.className)}
        onClick={onOpen}
      >
        <More className={iconMoreClassName} />
      </ButtonBase>

      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          className: classes.paper,
        }}
        {...menuProps}
      />
    </>
  );
};
