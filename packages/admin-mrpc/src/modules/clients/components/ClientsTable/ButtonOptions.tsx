import { toast } from 'react-toastify';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { useMenu } from 'modules/common/hooks/useMenu';
import { copyToClipboard } from 'modules/common/utils/copyToClipboard';
import { ReactComponent as IconCopy } from 'assets/img/copy.svg';
import { ReactComponent as IconDots } from 'assets/img/dots.svg';
import { useClientsTableStyles } from './ClientsTableStyles';
import { ClientMapped } from '../../store/clientsSlice';

interface IButtonOptionsProps {
  client: ClientMapped;
}

export const ButtonOptions = ({ client }: IButtonOptionsProps) => {
  const { open, anchorEl, handleOpen, handleClose } = useMenu();
  const { classes } = useClientsTableStyles();

  const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* fix: stopping event bubbling. row click opens client page */
    e.stopPropagation();
    handleOpen(e);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* fix: stopping event bubbling. row click opens client page */
    e.stopPropagation();
    handleClose();
  };

  const handleCopyClick = (
    e: React.MouseEvent<HTMLLIElement>,
    valueToCopy: string,
  ) => {
    /* fix: stopping event bubbling. row click opens client page */
    e.stopPropagation();
    copyToClipboard(valueToCopy).then(() => toast.success('Copied'));
  };

  return (
    <>
      <Button
        className={classes.btnOptions}
        onClick={handleOptionsClick}
        color="secondary"
      >
        <IconDots />
      </Button>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        TransitionComponent={Fade}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {client.address && (
          <MenuItem onClick={e => handleCopyClick(e, client.address!)}>
            <IconCopy style={{ marginRight: 8 }} />
            Copy ETH Address
          </MenuItem>
        )}
        <MenuItem onClick={e => handleCopyClick(e, client.user)}>
          <IconCopy style={{ marginRight: 8 }} />
          Copy User Token
        </MenuItem>
        {client.email && (
          <MenuItem onClick={e => handleCopyClick(e, client.email!)}>
            <IconCopy style={{ marginRight: 8 }} />
            Copy Email
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
