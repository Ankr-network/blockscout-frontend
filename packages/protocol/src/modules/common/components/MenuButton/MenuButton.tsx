import { LoadingButton, More } from '@ankr.com/ui';
import { ButtonBase, Menu, MenuProps } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { LoadingButtonProps } from 'uiKit/LoadingButton';

import { useMenuButtonStyles } from './useMenuButtonStyles';

export type MenuButtonProps = Pick<
  MenuProps,
  'children' | 'anchorEl' | 'open' | 'classes'
> & {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonProps?: LoadingButtonProps;
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
      <LoadingButton
        component={ButtonBase}
        {...buttonProps}
        className={cx(classes.menuButton, buttonProps.className)}
        onClick={onOpen}
      >
        {!buttonProps.loading && <More className={iconMoreClassName} />}
      </LoadingButton>

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
