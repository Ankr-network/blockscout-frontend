import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/near/RPCCallsConfig';
import { MethodsForm } from '../../../components/MethodsForm';
import { MethodNameSelectField } from '../../../components/MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../components/MethodsForm/MethodsFormSpy';
import { MethodsFormData } from '../../../components/MethodsForm/MethodsFormTypes';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../components/MethodsForm/MethodsFormUtils';
import { SampleCodeComponent } from '../../../components/SampleCodeComponent';
import { NearMethodsTabs } from '../../NearMethodsTabs';
import { NearMethodsFormProps } from './NearMethodsFormTypes';
import { methodsSelectOptions } from './NearMethodsFormUtils';

export const NearMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: NearMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: MethodsFormData) =>
      onSubmit(
        formatDataForRequest<NearLibraryID, NearMethod>(
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
    [group, libraryID],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
