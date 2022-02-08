import {
  Box,
  Step,
  StepLabel,
  Stepper as StepperComponent,
  StepperProps,
} from '@material-ui/core';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { CompleteCircleIcon } from 'uiKit/Icons/CompleteCircleIcon';
import { useNumericStepperStyles } from './useNumericStepperStyles';

export interface INumericStepperProps extends Omit<StepperProps, 'children'> {
  stepsCount: number;
  activeStep: number;
}

export const NumericStepper = ({
  stepsCount,
  activeStep,
  ...rest
}: INumericStepperProps) => {
  const classes = useNumericStepperStyles();

  const steps = new Array(stepsCount).fill('').map((item, index) => index + 1);

  return (
    <StepperComponent
      activeStep={activeStep}
      {...rest}
      className={classes.root}
    >
      {steps.map((item, index) => (
        <Step key={item}>
          <StepLabel
            classes={{
              root: classes.label,
              active: classes.active,
              labelContainer: classes.labelContainer,
              disabled: classes.disabled,
            }}
            StepIconComponent={
              activeStep > index
                ? stepProps =>
                    stepProps.completed ? (
                      <Box className={classes.completeIcon}>
                        <CompleteCircleIcon />
                      </Box>
                    ) : null
                : undefined
            }
          >
            {activeStep <= index ? item : null}
          </StepLabel>
        </Step>
      ))}
    </StepperComponent>
  );
};
