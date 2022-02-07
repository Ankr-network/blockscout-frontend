import {
  Step,
  StepLabel,
  Stepper as StepperComponent,
  StepperProps,
} from '@material-ui/core';

export interface IStepperProps extends StepperProps {
  steps?: { label?: string }[];
}

export const Stepper = (props: IStepperProps) => {
  const { steps = [] } = props;
  return (
    <StepperComponent activeStep={1}>
      {steps.map(item => (
        <Step key={item.label}>
          <StepLabel>{item.label}</StepLabel>
        </Step>
      ))}
    </StepperComponent>
  );
};
