import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { PChainMethodsFormProps } from './PChainMethodsFormTypes';
import { methodsSelectOptions } from './PChainMethodsFormUtils';
import { MethodNameSelectField } from '../../../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../../../MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../../../MethodsForm';
import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { SampleCodeComponent } from '../../../../../SampleCodeComponent';
import { PChainMethodsTabs } from '../../PChainMethodsTabs';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/p-chain/RPCCallsConfig';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../../MethodsForm/MethodsFormUtils';
import { MethodsFormData } from '../../../../../MethodsForm/MethodsFormTypes';

export const PChainMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: PChainMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(formatDataForRequest(data, libraryID, RPC_CALLS_CONFIG)),
    [onSubmit, libraryID],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<MethodsFormData>) => {
      const { methodName, ...otherArguments } = values;

      const { params } = formatDataForRequest(
        values,
        libraryID,
        RPC_CALLS_CONFIG,
      );

      const argumentsBlock = getArgumentsBlock<
        PChainMethod,
        AvalancheLibraryID
      >(methodName?.value as PChainMethod, libraryID, RPC_CALLS_CONFIG);

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
              isMethodDisabled(methodName?.value, RPC_CALLS_CONFIG)
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <PChainMethodsTabs
                  title={methodName?.value as PChainMethod}
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
    [libraryID, group],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
