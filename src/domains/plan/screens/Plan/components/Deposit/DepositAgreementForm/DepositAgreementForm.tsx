import React from 'react';
import {
  Typography,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

export const DepositAgreementForm = () => {
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
              {tHTML('plan.deposit.agreement.text')}
            </Typography>
          }
        />
        <Button color="primary" className={classes.button} disabled>
          {tHTML('plan.deposit.agreement.button')}
        </Button>
      </FormGroup>
    </div>
  );
};
