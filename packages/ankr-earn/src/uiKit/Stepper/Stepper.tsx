import {
  Step,
  StepLabel,
  Stepper as StepperComponent,
  StepperProps,
} from '@material-ui/core';

export interface IStepperProps extends Omit<StepperProps, 'children'> {
  steps?: { label?: string }[];
}

export const Stepper = (props: IStepperProps) => {
  const { steps = [], ...rest } = props;
  return (
    <StepperComponent {...rest}>
      {steps.map(item => (
        <Step key={item.label}>
          <StepLabel>{item.label}</StepLabel>
        </Step>
      ))}
    </StepperComponent>
  );
};
