import { FormControlLabel, Switch, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { ChangeEvent } from 'react';

import { ANKR_DOCS_TEAM_ACCOUNTS_LINK } from 'modules/common/constants/const';

import { useDataTransferSectionStyles } from './useDataTransferSectionStyles';

interface DataTransferSectionProps {
  isDataTransferEnabled: boolean;
  onDataTransferSwitchChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
}

export const DataTransferSection = ({
  isDataTransferEnabled,
  onDataTransferSwitchChange,
}: DataTransferSectionProps) => {
  const { cx, classes } = useDataTransferSectionStyles();

  return (
    <div className={classes.dataTransferSwitch}>
      <div className={classes.dataTransferInput}>
        <Typography
          variant="subtitle2"
          component="p"
          className={classes.switchTitle}
        >
          {tHTML('teams.create-team-form.data-transfer-title')}
        </Typography>

        <FormControlLabel
          classes={{
            root: classes.switcherRoot,
            label: classes.label,
          }}
          control={
            <Switch
              checked={isDataTransferEnabled}
              classes={{
                track: cx(classes.switchTrack, {
                  [classes.switchTrackEnabled]: isDataTransferEnabled,
                }),
              }}
              onChange={onDataTransferSwitchChange}
            />
          }
          label={
            isDataTransferEnabled
              ? t('teams.create-team-form.data-transfer-switch-on')
              : t('teams.create-team-form.data-transfer-switch-off')
          }
        />
      </div>

      <Typography variant="body2" component="p">
        {tHTML('teams.create-team-form.data-transfer-description', {
          href: ANKR_DOCS_TEAM_ACCOUNTS_LINK,
        })}
      </Typography>

      <Typography variant="body3" color="textSecondary" component="p">
        {t('teams.create-team-form.data-transfer-helper-text')}
      </Typography>
    </div>
  );
};
