import { FormControlLabel, Switch } from '@mui/material';
import { t } from '@ankr.com/common';

import { useChainProtocolContext } from 'domains/chains/screens/ChainPage/hooks/useChainProtocolContext';

import { useChainProtocolSwitchStyles } from './ChainProtocolSwitchStyles';

export const ChainProtocolSwitch = () => {
  const {
    chainProtocol,
    isChainProtocolSwitchEnabled,
    protocolGroup,
    toggleChainProtocolSwitch,
  } = useChainProtocolContext();

  const { classes } = useChainProtocolSwitchStyles();

  if (!protocolGroup) {
    return null;
  }

  return (
    <FormControlLabel
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      control={
        <Switch
          checked={isChainProtocolSwitchEnabled}
          classes={{
            checked: classes.switchChecked,
            track: classes.switchTrack,
          }}
          onChange={toggleChainProtocolSwitch}
        />
      }
      label={t(`chain-item.header.${chainProtocol}-label`)}
    />
  );
};
