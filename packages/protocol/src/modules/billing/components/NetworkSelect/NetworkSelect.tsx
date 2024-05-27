import { useCallback } from 'react';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { ChainID } from 'modules/chains/types';
import { networkNameByPathMap } from 'modules/billing/const';

import { useNetworkSelectStyles } from './useNetworkSelectStyles';
import { NetworkItem } from './NetworkItem';

export interface INetworkSelectOption {
  value: EBlockchain;
  depositContractAddress?: Web3Address;
}

interface INetworkSelectProps {
  activeNetwork: EBlockchain;
  options: INetworkSelectOption[];
  onNetworkChange: (network: EBlockchain) => void;
}

export const NetworkSelect = ({
  activeNetwork,
  options,
  onNetworkChange,
}: INetworkSelectProps) => {
  const { classes } = useNetworkSelectStyles();

  const handleChangeNetwork = useCallback(
    (event: SelectChangeEvent<EBlockchain>) => {
      onNetworkChange(event.target.value as EBlockchain);
    },
    [onNetworkChange],
  );

  const networkIcon = useChainIcon(activeNetwork as unknown as ChainID);

  const renderValue = useCallback(
    (value?: EBlockchain) => {
      if (!value) return t('account.networks.placeholder');

      return (
        <div className={classes.networkRoot}>
          <img src={networkIcon} className={classes.networkIcon} alt={value} />
          {t(networkNameByPathMap[value])}
        </div>
      );
    },
    [classes, networkIcon],
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="subtitle2">
        {t('account.networks.label')}
      </Typography>

      <Select
        displayEmpty
        value={activeNetwork}
        renderValue={renderValue}
        onChange={handleChangeNetwork}
        classes={{
          root: classes.selectRoot,
          select: classes.select,
        }}
        inputProps={{ classes: classes.inputRoot }}
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            className={classes.menuItem}
          >
            <NetworkItem
              network={option.value}
              isActive={option.value === activeNetwork}
            />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
