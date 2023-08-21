import { More } from '@ankr.com/ui';
import { ButtonBase, Menu, MenuProps } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useMenuButtonStyles } from './useMenuButtonStyles';

export type MenuButtonProps = Pick<
  MenuProps,
  'children' | 'anchorEl' | 'open'
> & {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
};

export const MenuButton = (props: MenuButtonProps) => {
  const { open, onOpen } = props;
  const { isLightTheme } = useThemes();

  const { classes } = useMenuButtonStyles({
    isOpened: open,
    isLightTheme,
  });

  return (
    <>
      <ButtonBase className={classes.menuButton} onClick={onOpen}>
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          className: classes.paper,
        }}
        {...props}
      />
    </>
  );
};
