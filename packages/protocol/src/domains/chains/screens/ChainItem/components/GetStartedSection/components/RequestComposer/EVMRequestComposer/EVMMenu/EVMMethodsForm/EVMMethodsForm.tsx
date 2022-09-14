import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EVMMethod } from 'domains/requestComposer/constants';
import { EVMMethodsFormData, EVMMethodsFormProps } from './EVMMethodsFormTypes';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
  methodsSelectOptions,
} from './EVMMethodsFormUtils';
import { SampleCodeComponent } from '../../../components/SampleCodeComponent';
import { MethodNameSelectField } from '../../../components/MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../components/MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../components/MethodsForm';
import { EVMMethodsTabs } from '../../EVMMethodsTabs';

export const EVMMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: EVMMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: EVMMethodsFormData) =>
      onSubmit(formatDataForRequest(data, libraryID)),
    [onSubmit, libraryID],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<EVMMethodsFormData>) => {
      const { methodName, ...otherArguments } = values;

      const { params } = formatDataForRequest(values, libraryID);

      const argumentsBlock = getArgumentsBlock(
        methodName?.value as EVMMethod,
        libraryID,
      );

      return (
        <form onSubmit={handleSubmit}>
          <MethodsForm
            methodNameSelectComponent={
              <MethodNameSelectField
                options={methodsSelectOptions}
                getMethodDescription={getMethodDescription}
              />
            }
            argumentsBlock={argumentsBlock}
            isButtonDisabled={
              !methodName || isMethodDisabled(methodName?.value as EVMMethod)
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <EVMMethodsTabs
                  title={methodName?.value as EVMMethod}
                  args={params}
                  group={group}
                  libraryID={libraryID}
                />
              </SampleCodeComponent>
            }
            formSpyComponent={
              <MethodsFormSpy
                methodName={methodName}
                otherArguments={otherArguments}
              />
            }
          />
        </form>
      );
    },
    [group, libraryID],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
