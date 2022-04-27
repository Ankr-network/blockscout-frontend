import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from './TopUpStepsStyles';
import { t } from 'modules/i18n/utils/intl';
import { Stepper } from './Stepper';
import { StepperTitle } from './StepperTitle';
import { StepperNotice } from './StepperNotice';
import { ITopUpStepsProps } from './TopUpStepsTypes';
import { getButtonText } from './TopUpStepsUtils';

export const TopUpSteps = ({
  step,
  onClick,
  loading,
  amount,
}: ITopUpStepsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper variant="elevation" className={classes.paper} elevation={0}>
        <Typography variant="h4" color="primary">
          {t('top-up-steps.title')}
        </Typography>
        <Stepper step={step} className={classes.stepper} />
        <StepperTitle step={step} className={classes.title} amount={amount} />
        <StepperNotice step={step} className={classes.notice} />
        <Box maxWidth={210} width="100%">
          <Button
            fullWidth
            disabled={loading}
            onClick={onClick}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {getButtonText(loading)}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
