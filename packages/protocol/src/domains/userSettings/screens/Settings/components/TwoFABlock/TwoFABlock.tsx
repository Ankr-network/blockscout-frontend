import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { TwoFAStatus } from 'multirpc-sdk';

import { Queries } from 'modules/common/components/Queries/Queries';
import { UserSettingsTwoFAStatusResult } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';

import { useTwoFABlockStyles } from './useTwoFABlockStyles';
import { TwoFASwitch } from './components/TwoFASwitch';
import { USER_SETTINGS_INTL_ROOT } from './constants';
import { useTwoFAStatusQuery } from './TwoFABlockUtils';
import { TwoFABlockSkeleton } from './components/TwoFABlockSkeleton';
import { BaseSettingsBlock } from '../BaseSettingsBlock';

export const TwoFABlock = () => {
  const { classes } = useTwoFABlockStyles();
  const fetchTwoFAStatusState = useTwoFAStatusQuery();

  return (
    <BaseSettingsBlock title={t(`${USER_SETTINGS_INTL_ROOT}.title`)}>
      <Queries<UserSettingsTwoFAStatusResult>
        queryStates={[fetchTwoFAStatusState]}
        spinner={<TwoFABlockSkeleton />}
      >
        {({ data }) => {
          const isEnabled = data?.status === TwoFAStatus.Enabled;

          return (
            <div>
              <div className={classes.bottom}>
                <TwoFASwitch isEnabled={isEnabled} />
              </div>
              <div className={classes.description}>
                <Typography variant="body3" color="textSecondary">
                  {tHTML(`${USER_SETTINGS_INTL_ROOT}.info`)}
                </Typography>
              </div>
            </div>
          );
        }}
      </Queries>
    </BaseSettingsBlock>
  );
};
