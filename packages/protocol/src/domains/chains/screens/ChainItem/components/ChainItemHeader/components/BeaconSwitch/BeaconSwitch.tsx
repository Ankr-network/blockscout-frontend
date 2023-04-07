import { FormControlLabel, Switch } from '@mui/material';
import { t } from '@ankr.com/common';

import { useBeaconSwitchStyles } from './BeaconSwitchStyles';
import { useBeaconContext } from 'domains/chains/screens/ChainItem/hooks/useBeaconContext';

export const BeaconSwitch = () => {
  const { beaconGroup, hasBeacon, toggleBeacon } = useBeaconContext();

  const { classes } = useBeaconSwitchStyles();

  if (!beaconGroup) {
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
          checked={hasBeacon}
          classes={{
            checked: classes.switchChecked,
            track: classes.switchTrack,
          }}
          onChange={toggleBeacon}
        />
      }
      label={t('chain-item.header.beacon-label')}
    />
  );
};
