import { Button, FormGroup, Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { Field, Form, FormRenderProps, FormSpy } from 'react-final-form';

import { EVMMethod } from 'domains/requestComposer/constants';
import { MethodOption } from 'domains/requestComposer/types';
import { t } from 'modules/i18n/utils/intl';
import { MethodsSelectField } from '../MethodsSelect/MethodsSelectField';
import { useEVMMethodsFormStyles } from './EVMMethodsFormStyles';
import { EVMMethodsFormData, EVMMethodsFormProps } from './EVMMethodsFormTypes';
import {
  formatDataForRequest,
  getArgumentsBlock,
  getMethodDescription,
  isMethodDisabled,
  methodsSelectOptions,
} from './EVMMethodsFormUtils';
import { SampleCodeComponent } from '../../SampleCodeComponent';

export const EVMMethodsForm = ({
  group,
  libraryID,
  onSubmit,
}: EVMMethodsFormProps) => {
  const classes = useEVMMethodsFormStyles();

  const onFormSubmit = useCallback(
    (data: EVMMethodsFormData) =>
      onSubmit(formatDataForRequest(data, libraryID)),
    [onSubmit, libraryID],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values, form }: FormRenderProps<EVMMethodsFormData>) => {
      const { methodName, ...otherArguments } = values;

      const { params } = formatDataForRequest(values, libraryID);

      const argumentsBlock = getArgumentsBlock(
        methodName?.value as EVMMethod,
        libraryID,
      );

      return (
        <>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="methodName">
                {fieldProps => (
                  <MethodsSelectField<MethodOption>
                    className={classes.methodsSelect}
                    label={t('chain-item.request-composer.form.methods-label')}
                    placeholder={t(
                      'chain-item.request-composer.form.methods-placeholder',
                    )}
                    noOptionsText={t(
                      'chain-item.request-composer.form.methods-no-options-text',
                    )}
                    options={methodsSelectOptions}
                    getOptionLabel={method => method.label}
                    getOptionSelected={(method, selectedMethod) =>
                      method.value === selectedMethod?.value
                    }
                    showExtra={getMethodDescription}
                    {...fieldProps}
                  />
                )}
              </Field>
              {argumentsBlock.length > 0 && (
                <>
                  <Typography
                    variant="body2"
                    className={classes.argumentsTitle}
                  >
                    {t('chain-item.request-composer.form.arguments-title')}
                  </Typography>
                  {argumentsBlock}
                </>
              )}
              <Button
                type="submit"
                size="medium"
                className={classes.button}
                disabled={
                  !methodName ||
                  isMethodDisabled(methodName?.value as EVMMethod)
                }
              >
                {t('chain-item.request-composer.form.button')}
              </Button>
              <SampleCodeComponent
                group={group}
                libraryID={libraryID}
                methodName={methodName}
                args={params}
              />
            </FormGroup>
            <FormSpy
              subscription={{ values: true }}
              onChange={props => {
                if (methodName?.value !== props.values.methodName?.value) {
                  Object.keys(otherArguments).forEach(fieldName => {
                    form.change(fieldName, '');
                  });
                }
              }}
            />
          </form>
        </>
      );
    },
    [
      classes.button,
      classes.argumentsTitle,
      classes.methodsSelect,
      group,
      libraryID,
    ],
  );

  return <Form onSubmit={onFormSubmit} render={renderForm} />;
};
