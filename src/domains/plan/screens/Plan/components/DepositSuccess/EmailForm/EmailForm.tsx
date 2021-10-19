import React from 'react';
import {
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

export const EmailForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox name="checkedA" />}
          label={
            <Typography
              variant="caption"
              className={classes.caption}
              color="textSecondary"
            >
              {tHTML('plan.deposit-success.email-form.alerts-label')}
            </Typography>
          }
        />
        <FormControlLabel
          control={<Checkbox name="checkedA" />}
          label={
            <Typography
              variant="caption"
              className={classes.caption}
              color="textSecondary"
            >
              {tHTML('plan.deposit-success.email-form.marketings-label')}
            </Typography>
          }
        />
        <div className={classes.buttons}>
          <Button color="primary" className={classes.button}>
            {tHTML('plan.deposit-success.email-form.done-button')}
          </Button>
          <Button color="primary" className={classes.button} variant="outlined">
            {tHTML('plan.deposit-success.email-form.skip-button')}
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};
