import { FormGroup, Typography } from '@mui/material';
import { Field } from 'react-final-form';
import { t } from '@ankr.com/common';

import { CheckboxField } from 'modules/form/components/CheckboxField/CheckboxField';

import { useStyles } from './NotificationsFormStyles';
import { NotificationsFormFields } from './NotificationsFormTypes';
import { EmailBlock } from '../EmailBlock';

export const NotificationsForm = () => {
  const { classes } = useStyles();

  return (
    <FormGroup>
      <Typography variant="subtitle2" className={classes.subtitle}>
        {t('user-settings.notifications.form.email')}
      </Typography>

      <EmailBlock />

      <Typography variant="subtitle2" className={classes.subtitle}>
        {t('user-settings.notifications.form.budget-alerts')}
      </Typography>

      <Field
        component={CheckboxField}
        name={NotificationsFormFields.lowBalance}
        type="checkbox"
        className={classes.row}
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.low-balance')}
          </Typography>
        }
      />
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.lowCreditsInfo}
        type="checkbox"
        className={classes.row}
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.low-credits-info')}
          </Typography>
        }
      />
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.lowCreditsWarn}
        type="checkbox"
        className={classes.row}
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.low-credits-warn')}
          </Typography>
        }
      />
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.lowCreditsAlarm}
        type="checkbox"
        className={classes.row}
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.low-credits-alarm')}
          </Typography>
        }
      />
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.balance}
        type="checkbox"
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.balance-update')}
          </Typography>
        }
      />

      <Typography variant="subtitle2" className={classes.subtitle}>
        {t('user-settings.notifications.form.newsletter')}
      </Typography>
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.marketing}
        type="checkbox"
        label={
          <Typography variant="body2" className={classes.label}>
            {t('user-settings.notifications.form.marketing')}
          </Typography>
        }
      />
    </FormGroup>
  );
};
