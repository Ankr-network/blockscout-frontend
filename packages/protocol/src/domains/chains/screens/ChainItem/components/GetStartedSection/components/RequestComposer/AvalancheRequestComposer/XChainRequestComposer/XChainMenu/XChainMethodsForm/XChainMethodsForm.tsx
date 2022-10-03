import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { XChainMethodsFormProps } from './XChainMethodsFormTypes';
import { methodsSelectOptions } from './XChainMethodsFormUtils';
import { MethodNameSelectField } from '../../../../components/MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../../components/MethodsForm/MethodsFormSpy';
import { MethodsForm } from '../../../../components/MethodsForm';
import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { SampleCodeComponent } from '../../../../components/SampleCodeComponent';
import { XChainMethodsTabs } from '../../XChainMethodsTabs';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/x-chain/RPCCallsConfig';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../../components/MethodsForm/MethodsFormUtils';
import { MethodsFormData } from '../../../../components/MethodsForm/MethodsFormTypes';

export const XChainMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: XChainMethodsFormProps) => {
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
        XChainMethod,
        AvalancheLibraryID
      >(methodName?.value as XChainMethod, libraryID, RPC_CALLS_CONFIG);

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
                <XChainMethodsTabs
                  title={methodName?.value as XChainMethod}
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
