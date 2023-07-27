import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsRequest } from 'domains/requestComposer/types';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';

import { MethodNameSelectField } from '../../../../../MethodsForm/MethodNameSelectField';
import { MethodsForm } from '../../../../../MethodsForm';
import { MethodsFormData } from '../../../../../MethodsForm/MethodsFormTypes';
import { MethodsFormSpy } from '../../../../../MethodsForm/MethodsFormSpy';
import { SampleCodeComponent } from '../../../../../SampleCodeComponent';
import { SolanaMethodsTabs } from '../SolanaMethodsTabs';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../../MethodsForm/MethodsFormUtils';
import { methodsSelectOptions } from './const';

export interface SolanaMethodsFormProps {
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
  onSubmit: (data: MethodsRequest<SolanaMethod>) => void;
}

export const SolanaMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: SolanaMethodsFormProps) => {
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

      const argumentsBlock = getArgumentsBlock(
        methodName?.value as SolanaMethod,
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
              isMethodDisabled(methodName?.value, RPC_CALLS_CONFIG)
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <SolanaMethodsTabs
                  title={methodName?.value as SolanaMethod}
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
