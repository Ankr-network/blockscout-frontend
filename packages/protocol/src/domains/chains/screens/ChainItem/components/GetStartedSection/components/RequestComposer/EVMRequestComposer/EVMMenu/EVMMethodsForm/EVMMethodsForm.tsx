import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EVMLibraryID, EVMMethod } from 'domains/requestComposer/constants';
import { EVMMethodsFormProps } from './EVMMethodsFormTypes';
import { methodsSelectOptions } from './EVMMethodsFormUtils';
import { SampleCodeComponent } from '../../../components/SampleCodeComponent';
import { MethodNameSelectField } from '../../../components/MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../components/MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../components/MethodsForm';
import { EVMMethodsTabs } from '../../EVMMethodsTabs';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/RPCCallsConfig';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../components/MethodsForm/MethodsFormUtils';
import { MethodsFormData } from '../../../components/MethodsForm/MethodsFormTypes';

export const EVMMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: EVMMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(
        formatDataForRequest<EVMLibraryID, EVMMethod>(
          data,
          libraryID,
          RPC_CALLS_CONFIG,
        ),
      ),
    [onSubmit, libraryID],
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
    [group, libraryID],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
