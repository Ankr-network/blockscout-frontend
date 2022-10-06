import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EndpointGroup } from 'modules/endpoints/types';
import { MethodNameSelectField } from '../../../../components/MethodsForm/MethodNameSelectField';
import { MethodsForm } from '../../../../components/MethodsForm';
import { MethodsFormData } from '../../../../components/MethodsForm/MethodsFormTypes';
import { MethodsFormSpy } from '../../../../components/MethodsForm/MethodsFormSpy';
import { MethodsRequest } from 'domains/requestComposer/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import { SampleCodeComponent } from '../../../../components/SampleCodeComponent';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { SolanaMethodsTabs } from '../SolanaMethodsTabs';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../components/MethodsForm/MethodsFormUtils';
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
    [libraryID, group],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
