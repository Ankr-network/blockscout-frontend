import { More } from '@ankr.com/ui';
import { ButtonBase, ButtonProps, Menu, MenuProps } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useMenuButtonStyles } from './useMenuButtonStyles';

export type MenuButtonProps = Pick<
  MenuProps,
  'children' | 'anchorEl' | 'open'
> & {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonProps?: ButtonProps;
  onClose: () => void;
};

export const MenuButton = (props: MenuButtonProps) => {
  const { open, onOpen, buttonProps = {}, ...menuProps } = props;
  const { isLightTheme } = useThemes();

  const { cx, classes } = useMenuButtonStyles({
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
        <More />
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
