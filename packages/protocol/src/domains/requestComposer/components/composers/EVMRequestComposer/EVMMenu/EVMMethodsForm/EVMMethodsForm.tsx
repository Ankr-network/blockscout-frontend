import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EVMLibraryID, EVMMethod } from 'domains/requestComposer/constants';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/RPCCallsConfig';

import { EVMMethodsFormProps } from './EVMMethodsFormTypes';
import { methodsSelectOptions } from './EVMMethodsFormUtils';
import { SampleCodeComponent } from '../../../../SampleCodeComponent';
import { MethodNameSelectField } from '../../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../../MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../../MethodsForm';
import { EVMMethodsTabs } from '../../EVMMethodsTabs';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../MethodsForm/MethodsFormUtils';
import { MethodsFormData } from '../../../../MethodsForm/MethodsFormTypes';

export const EVMMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: EVMMethodsFormProps) => {
  const RPC_CALLS_CONFIG = getRPCCallsConfig();

  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(
        formatDataForRequest<EVMLibraryID, EVMMethod>(
          data,
          libraryID,
          RPC_CALLS_CONFIG,
        ),
      ),
    [onSubmit, libraryID, RPC_CALLS_CONFIG],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<MethodsFormData>) => {
      const { methodName, ...otherArguments } = values;

      const { params } = formatDataForRequest<EVMLibraryID, EVMMethod>(
        values,
        libraryID,
        RPC_CALLS_CONFIG,
      );

      const argumentsBlock = getArgumentsBlock<EVMMethod, EVMLibraryID>(
        methodName?.value as EVMMethod,
        libraryID,
        RPC_CALLS_CONFIG,
      );

      return (
        <form onSubmit={handleSubmit}>
          <MethodsForm
            methodNameSelectComponent={
              <MethodNameSelectField
                options={methodsSelectOptions}
                getMethodDescription={method =>
                  getMethodDescription(RPC_CALLS_CONFIG, method)
                }
              />
            }
            argumentsBlock={argumentsBlock}
            isButtonDisabled={
              !methodName ||
              isMethodDisabled(methodName?.value as EVMMethod, RPC_CALLS_CONFIG)
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
    [group, libraryID, RPC_CALLS_CONFIG],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
