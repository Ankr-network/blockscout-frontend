import { EBlockchain } from 'multirpc-sdk';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { INetwork } from 'modules/payments/types';
import { networkNameByPathMap } from 'modules/payments/const';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { NetworkItem } from './components/NetworkItem';
import { useNetworkSelectStyles } from './useNetworkSelectStyles';

export interface INetworkSelectProps {
  activeNetwork: EBlockchain;
  options: INetwork[];
  onNetworkChange?: (network: EBlockchain) => void;
}

export const NetworkSelect = ({
  activeNetwork,
  onNetworkChange,
  options,
}: INetworkSelectProps) => {
  const { classes } = useNetworkSelectStyles();

  const handleChangeNetwork = useCallback(
    (event: SelectChangeEvent<EBlockchain>) => {
      onNetworkChange?.(event.target.value as EBlockchain);
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
        {options.map(({ blockchain }) => (
          <MenuItem
            className={classes.menuItem}
            key={blockchain}
            value={blockchain}
          >
            <NetworkItem
              isActive={blockchain === activeNetwork}
              network={blockchain}
            />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
