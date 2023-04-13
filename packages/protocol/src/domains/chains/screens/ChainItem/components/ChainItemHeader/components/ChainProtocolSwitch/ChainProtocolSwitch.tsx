import { FormControlLabel, Switch } from '@mui/material';
import { t } from '@ankr.com/common';

import { useChainProtocolSwitchStyles } from './ChainProtocolSwitchStyles';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

export const ChainProtocolSwitch = () => {
  const {
    protocolGroup,
    isChainProtocolSwitchEnabled,
    toggleChainProtocolSwitch,
    chainProtocol,
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
