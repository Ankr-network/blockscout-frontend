import {
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';
import { HARMONY_CALL_CONFIG } from 'domains/requestComposer/utils/harmony/RPCCallConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { MethodsForm } from '../../../MethodsForm';
import { MethodNameSelectField } from '../../../MethodsForm/MethodNameSelectField';
import { MethodsFormSpy } from '../../../MethodsForm/MethodsFormSpy';
import { HarmonyMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';
import {
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
} from '../../../MethodsForm/MethodsFormUtils';
import { SampleCodeComponent } from '../../../SampleCodeComponent';
import { HarmonyApiVersionPrefix } from '../HarmonyApiVersionTabs/versionTabsUtils';
import { HarmonyMethodsTabs } from '../HarmonyMethodsTabs';
import { methodsSelectOptions } from './HarmonyMethodsFormUtils';

interface IHarmonyMethodsFormProps {
  group: EndpointGroup;
  libraryID: HarmonyLibraryID;
  onSubmit: (data: HarmonyMethodsFormData) => void;
  versionId?: HarmonyApiVersionPrefix;
}

export const HarmonyMethodsForm = ({
  group,
  libraryID,
  onSubmit,
  versionId,
}: IHarmonyMethodsFormProps) => {
  const onFormSubmit = useCallback(
    (data: HarmonyMethodsFormData) => onSubmit(data),
    [onSubmit],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<any>) => {
      const { methodName, ...otherArguments } = values;

      const argumentsBlock = getArgumentsBlock(
        methodName?.value as HarmonyMethod,
        libraryID,
        HARMONY_CALL_CONFIG,
      );

      return (
        <form onSubmit={handleSubmit}>
          <MethodsForm
            methodNameSelectComponent={
              <MethodNameSelectField
                options={methodsSelectOptions(versionId)}
                getMethodDescription={method =>
                  getMethodDescription(HARMONY_CALL_CONFIG, method)
                }
              />
            }
            argumentsBlock={argumentsBlock}
            isButtonDisabled={
              !methodName ||
              isMethodDisabled(
                methodName?.value as HarmonyMethod,
                HARMONY_CALL_CONFIG,
              )
            }
            sampleCodeComponent={
              <SampleCodeComponent methodName={methodName}>
                <HarmonyMethodsTabs
                  group={group}
                  title={methodName?.value as HarmonyMethod}
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
    [group, libraryID, versionId],
  );

  return <Form render={renderForm} onSubmit={onFormSubmit} />;
};
