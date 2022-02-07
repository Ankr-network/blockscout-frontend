import { Box } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { useBridgeBlockchainPanelStyles } from './useBridgeBlockchainPanelStyles';

export interface IBridgeBlockchainPanelItem {
  value: string;
  label: string;
  icon: JSX.Element;
}

export interface IBridgeBlockchainPanelProps {
  direction: 'from' | 'to';
  value?: IBridgeBlockchainPanelItem['value'];
  items?: IBridgeBlockchainPanelItem[];
}

export const BridgeBlockchainPanel = ({
  direction,
  items = [],
  value,
}: IBridgeBlockchainPanelProps) => {
  const classes = useBridgeBlockchainPanelStyles();
  const title =
    direction === 'from' ? t('bridge.main.from') : t('bridge.main.to');

  const currentItem = items.find(item => item.value === value);

  return (
    <div className={classes.root}>
      <Box className={classes.rootRow}>
        <Box>
          <Box className={classes.icon}>{currentItem?.icon}</Box>
        </Box>
        <Box>
          <Box className={classes.title}>{title}</Box>
          <Box>{currentItem?.label}</Box>
        </Box>
      </Box>
    </div>
  );
};
