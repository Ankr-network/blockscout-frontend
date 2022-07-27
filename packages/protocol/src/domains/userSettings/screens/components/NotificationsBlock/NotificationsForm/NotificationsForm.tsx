import { FormGroup, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { CheckboxField } from 'modules/form/components/CheckboxField/CheckboxField';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './NotificationsFormStyles';
import { NotificationsFormFields } from './NotificationsFormTypes';

export const NotificationsForm = () => {
  const classes = useStyles();

  return (
    <FormGroup>
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
