import { FormSpy, useForm } from 'react-final-form';

import { MethodOption } from 'domains/requestComposer/types';

interface MethodsFormSpyProps {
  methodName?: MethodOption;
  otherArguments: { [key: string]: string };
}

export const MethodsFormSpy = ({
  methodName,
  otherArguments,
}: MethodsFormSpyProps) => {
  const form = useForm();

  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={props => {
        if (methodName?.value !== props.values.methodName?.value) {
          Object.keys(otherArguments).forEach(fieldName => {
            form.change(fieldName, '');
          });
        }
      }}
    />
  );
};
