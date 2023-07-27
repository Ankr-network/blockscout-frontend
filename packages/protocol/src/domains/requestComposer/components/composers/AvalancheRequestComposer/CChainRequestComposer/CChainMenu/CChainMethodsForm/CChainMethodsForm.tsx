import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/avalanche/c-chain/RPCCallsConfig';

import { CChainMethodsFormProps } from './CChainMethodsFormTypes';
import { methodsSelectOptions } from './CChainMethodsFormUtils';
import { MethodNameSelectField } from '../../../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../../../MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../../../MethodsForm';
import { SampleCodeComponent } from '../../../../../SampleCodeComponent';
import { CChainMethodsTabs } from '../../CChainMethodsTabs';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../../MethodsForm/MethodsFormUtils';
import { MethodsFormData } from '../../../../../MethodsForm/MethodsFormTypes';

export const CChainMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: CChainMethodsFormProps) => {
  const RPC_CALLS_CONFIG = getRPCCallsConfig();

  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(formatDataForRequest(data, libraryID, RPC_CALLS_CONFIG)),
    [onSubmit, libraryID, RPC_CALLS_CONFIG],
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
        CChainMethod,
        AvalancheLibraryID
      >(methodName?.value as CChainMethod, libraryID, RPC_CALLS_CONFIG);

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
                <CChainMethodsTabs
                  title={methodName?.value as CChainMethod}
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
    [libraryID, group, RPC_CALLS_CONFIG],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
