import { FormGroup, Typography, Divider } from '@mui/material';
import { Field } from 'react-final-form';

import { CheckboxField } from 'modules/form/components/CheckboxField/CheckboxField';
import { t } from '@ankr.com/common';
import { useStyles } from './NotificationsFormStyles';
import { NotificationsFormFields } from './NotificationsFormTypes';

export const NotificationsForm = () => {
  const { classes } = useStyles();

  return (
    <FormGroup>
      <Field
        component={CheckboxField}
        name={NotificationsFormFields.lowBalance}
        type="checkbox"
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
            {t('user-settings.notifications.form.balance-updates.title')}
          </Typography>
        }
      />
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.description}
      >
        {t('user-settings.notifications.form.balance-updates.description')}
      </Typography>
      <Divider className={classes.divider} />
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
