import React from 'react';
import {
  Button,
  Checkbox,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useMenu } from 'modules/common/hooks/useMenu';
import { ReactComponent as IconFilter } from 'assets/img/filter.svg';
import { useClientsTypeFiltersStyles } from '../ClientsTypeFilters/useClientsTypeFiltersStyles';
import { ClientMapped } from '../../store/clientsSlice';

interface IClientsValueFiltersProps {
  filterKeys: (keyof ClientMapped)[];
  handleFilterKey: (key?: keyof ClientMapped) => void;
}

export const ClientsValueFilters = ({
  filterKeys,
  handleFilterKey,
}: IClientsValueFiltersProps) => {
  const { open, anchorEl, handleOpen, handleClose } = useMenu();
  const { classes } = useClientsTypeFiltersStyles();

  return (
    <>
      <Button onClick={handleOpen} color="secondary">
        <IconFilter className={classes.iconFilter} />
        Filters
        {filterKeys?.length > 0 && (
          <span className={classes.counter}>{filterKeys.length}</span>
        )}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleFilterKey('email')}>
          <Checkbox checked={filterKeys?.includes('email')} />
          <Typography variant="body2">Has Email</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleFilterKey('amount')}>
          <Checkbox checked={filterKeys?.includes('amount')} />
          <Typography variant="body2">Has Amount</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleFilterKey('ttl')}>
          <Checkbox checked={filterKeys?.includes('ttl')} />
          <Typography variant="body2">Has Expiration</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleFilterKey('hash')}>
          <Checkbox checked={filterKeys?.includes('hash')} />
          <Typography variant="body2">Has Hash</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleFilterKey(undefined)}>
          <Typography className={classes.buttonClear} variant="body2">
            Clear filters
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
