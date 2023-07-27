import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/near/RPCCallsConfig';

import { MethodsForm } from '../../../../MethodsForm';
import { MethodNameSelectField } from '../../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../../MethodsForm/MethodsFormSpy';
import { MethodsFormData } from '../../../../MethodsForm/MethodsFormTypes';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../MethodsForm/MethodsFormUtils';
import { SampleCodeComponent } from '../../../../SampleCodeComponent';
import { NearMethodsTabs } from '../../NearMethodsTabs';
import { NearMethodsFormProps } from './NearMethodsFormTypes';
import { methodsSelectOptions } from './NearMethodsFormUtils';

export const NearMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: NearMethodsFormProps) => {
  const RPC_CALLS_CONFIG = getRPCCallsConfig();

  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(
        formatDataForRequest<NearLibraryID, NearMethod>(
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

      const { params } = formatDataForRequest<NearLibraryID, NearMethod>(
        values,
        libraryID,
        RPC_CALLS_CONFIG,
      );

      const argumentsBlock = getArgumentsBlock<NearMethod, NearLibraryID>(
        methodName?.value as NearMethod,
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
              isMethodDisabled(
                methodName?.value as NearMethod,
                RPC_CALLS_CONFIG,
              )
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <NearMethodsTabs
                  title={methodName?.value as NearMethod}
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
