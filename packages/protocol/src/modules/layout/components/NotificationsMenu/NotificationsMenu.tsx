import { Fade, Menu, MenuProps } from '@mui/material';

import { useNotificationsMenuStyles } from './useNotificationsMenuStyles';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { Footer } from './components/Footer';
import { useNotificationsMenu } from './useNotificationsMenu';

interface INotificationsMenuProps extends Pick<MenuProps, 'anchorEl' | 'open'> {
  onClose: () => void;
}

export const NotificationsMenu = ({
  anchorEl,
  onClose,
  open,
}: INotificationsMenuProps) => {
  const { classes } = useNotificationsMenuStyles();

  const { activeFilter, handleChangeFilter, isDisabledFooter } =
    useNotificationsMenu();

  return (
    <Menu
      PaperProps={{
        className: classes.paper,
      }}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 40,
        horizontal: 'left',
      }}
      classes={{
        list: classes.list,
        paper: classes.paperRoot,
      }}
      disableScrollLock
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <div className={classes.root}>
        <div className={classes.content}>
          <Header />
          <Filters
            activeFilter={activeFilter}
            handleChangeFilter={handleChangeFilter}
          />
          <Content activeFilter={activeFilter} />
        </div>
        <Footer isDisabled={isDisabledFooter} onClick={onClose} />
      </div>
    </Menu>
  );
};
