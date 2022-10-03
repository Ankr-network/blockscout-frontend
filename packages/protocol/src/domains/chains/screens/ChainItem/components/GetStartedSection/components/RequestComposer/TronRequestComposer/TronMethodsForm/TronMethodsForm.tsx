import React, { useCallback } from 'react';
import { EndpointGroup } from 'modules/endpoints/types';
import { Form, FormRenderProps } from 'react-final-form';
import { MethodsForm } from '../../components/MethodsForm';
import { MethodNameSelectField } from '../../components/MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../components/MethodsForm/MethodsFormSpy';
import { SampleCodeComponent } from '../../components/SampleCodeComponent';
import {
  formatSubmiteData,
  methodsSelectOptions,
} from './TronMethodsFormUtils';
import {
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../components/MethodsForm/MethodsFormUtils';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { TRON_CALL_CONFIG } from 'domains/requestComposer/utils/tron/RPCCallsConfig';
import { TronMethodsTabs } from '../TronMethodsTabs';
import { TronMethodsFormData } from '../../components/MethodsForm/MethodsFormTypes';

interface ITronMethodsFormProps {
  group: EndpointGroup;
  libraryID: TronLibraryID;
  onSubmit: (data: TronMethodsFormData) => void;
}

export const TronMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: ITronMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: TronMethodsFormData) => onSubmit(formatSubmiteData(data)),
    [onSubmit],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<any>) => {
      const { methodName, ...otherArguments } = values;

      const argumentsBlock = getArgumentsBlock(
        methodName?.value as TronChainMethod,
        libraryID,
        TRON_CALL_CONFIG,
      );

      return (
        <form onSubmit={handleSubmit}>
          <MethodsForm
            methodNameSelectComponent={
              <MethodNameSelectField
                options={methodsSelectOptions}
                getMethodDescription={method =>
                  getMethodDescription(TRON_CALL_CONFIG, method)
                }
              />
            }
            argumentsBlock={argumentsBlock}
            isButtonDisabled={
              !methodName ||
              isMethodDisabled(
                methodName?.value as TronChainMethod,
                TRON_CALL_CONFIG,
              )
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <TronMethodsTabs
                  group={group}
                  title={methodName?.value as TronChainMethod}
                  args={otherArguments}
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

  return <Form render={renderForm} onSubmit={onFormSubmit} />;
};
