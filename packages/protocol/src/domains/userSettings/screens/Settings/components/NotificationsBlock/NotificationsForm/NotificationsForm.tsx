import { InlineAlert } from '@ankr.com/ui';
import { FormGroup, Typography } from '@mui/material';
import { Field } from 'react-final-form';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useStyles } from './NotificationsFormStyles';
import { NotificationsFormFields } from './NotificationsFormTypes';
import { EmailBlock } from '../EmailBlock';
import { MessengersBlock } from '../MessengersBlock';
import { notificationsFormTranslation } from './translation';
import { NotificationFormRow } from '../NotificationFormRow';

export const NotificationsForm = () => {
  const { classes, cx } = useStyles();

  const { keys, t } = useTranslation(notificationsFormTranslation);

  return (
    <FormGroup>
      <Typography variant="subtitle2" className={classes.title}>
        {t(keys.howNotified)}
      </Typography>

      <Typography
        variant="subtitle3"
        className={cx(classes.subtitle, classes.firstSubtitle)}
      >
        {t(keys.email)}
      </Typography>

      <EmailBlock />

      <Typography variant="subtitle3" className={classes.thirdPartyTitle}>
        {t(keys.thirdParty)}
      </Typography>

      <MessengersBlock />

      <div className={cx(classes.header, classes.regularRow, classes.basicRow)}>
        <Typography
          variant="subtitle2"
          className={cx(classes.subtitle, classes.nameHeader)}
        >
          {t(keys.activities)}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.subtitle, classes.inAppHeader)}
        >
          {t(keys.inApp)}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.subtitle, classes.emailHeader)}
        >
          {t(keys.email)}
        </Typography>
      </div>

      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.marketing}
        type="checkbox"
        className={classes.basicRow}
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.marketing)}
          </Typography>
        }
      />

      <Typography variant="subtitle2" className={classes.subtitle}>
        {t(keys.budgetAlerts)}
      </Typography>

      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.lowBalance}
        type="checkbox"
        className={cx(classes.basicRow, classes.row)}
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.lowBalance)}
          </Typography>
        }
      />
      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.lowCreditsInfo}
        type="checkbox"
        className={cx(classes.basicRow, classes.row)}
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.lowCreditsInfo)}
          </Typography>
        }
      />
      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.lowCreditsWarn}
        type="checkbox"
        className={cx(classes.basicRow, classes.row)}
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.lowCreditsWarn)}
          </Typography>
        }
      />
      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.lowCreditsAlarm}
        type="checkbox"
        className={cx(classes.basicRow, classes.row)}
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.lowCreditsAlarm)}
          </Typography>
        }
      />
      <Field
        component={NotificationFormRow}
        name={NotificationsFormFields.balance}
        className={cx(classes.basicRow, classes.regularRow)}
        type="checkbox"
        label={
          <Typography variant="body2" className={classes.label}>
            {t(keys.balanceUpdate)}
          </Typography>
        }
      />

      <InlineAlert icon={false} severity="info" className={classes.alert}>
        {t(keys.alert)}
      </InlineAlert>
    </FormGroup>
  );
};
