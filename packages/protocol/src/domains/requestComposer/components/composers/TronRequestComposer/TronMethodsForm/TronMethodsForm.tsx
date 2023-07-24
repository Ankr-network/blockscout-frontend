import React, { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { EndpointGroup } from 'modules/endpoints/types';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { TRON_CALL_CONFIG } from 'domains/requestComposer/utils/tron/RPCCallsConfig';

import { MethodsForm } from '../../../MethodsForm';
import { MethodNameSelectField } from '../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../MethodsForm/MethodsFormSpy';
import { SampleCodeComponent } from '../../../SampleCodeComponent';
import {
  formatSubmiteData,
  methodsSelectOptions,
} from './TronMethodsFormUtils';
import {
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../MethodsForm/MethodsFormUtils';
import { TronMethodsTabs } from '../TronMethodsTabs';
import { TronMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';

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
