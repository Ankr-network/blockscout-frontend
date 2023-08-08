import { Paper, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Dot } from '@ankr.com/ui';
import { TwoFAStatus } from 'multirpc-sdk';
import { Variant } from '@mui/material/styles/createTypography';

import { Queries } from 'modules/common/components/Queries/Queries';
import { UserSettingsTwoFAStatusResult } from 'domains/userSettings/actions/twoFA/fetchTwoFAStatus';

import { useTwoFABlockStyles } from './useTwoFABlockStyles';
import { TwoFASwitch } from './components/TwoFASwitch';
import { USER_SETTINGS_INTL_ROOT } from './constants';
import { useTwoFAStatusQuery } from './TwoFABlockUtils';
import { TwoFABlockSkeleton } from './components/TwoFABlockSkeleton';

export const TwoFABlock = () => {
  const { classes } = useTwoFABlockStyles();
  const fetchTwoFAStatusState = useTwoFAStatusQuery();

  return (
    <Paper className={classes.root}>
      <Queries<UserSettingsTwoFAStatusResult>
        queryStates={[fetchTwoFAStatusState]}
        spinner={<TwoFABlockSkeleton />}
      >
        {({ data }) => {
          const isEnabled = data?.status === TwoFAStatus.Enabled;

          return (
            <>
              <div className={classes.top}>
                <Typography className={classes.title}>
                  {t(`${USER_SETTINGS_INTL_ROOT}.title`)}
                </Typography>

                <div className={classes.status}>
                  <Dot className={isEnabled ? classes.on : classes.off} />
                  {t(`${USER_SETTINGS_INTL_ROOT}.${isEnabled ? 'on' : 'off'}`)}
                </div>
              </div>

              <div className={classes.info}>
                <div className={classes.bottom}>
                  <TwoFASwitch isEnabled={isEnabled} />
                </div>
                <div className={classes.description}>
                  <Typography
                    variant={'body3' as Variant}
                    color="textSecondary"
                  >
                    {tHTML(`${USER_SETTINGS_INTL_ROOT}.info`)}
                  </Typography>
                </div>
              </div>
            </>
          );
        }}
      </Queries>
    </Paper>
  );
};
