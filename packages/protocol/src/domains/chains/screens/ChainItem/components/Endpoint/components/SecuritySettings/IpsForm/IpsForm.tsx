import React, { useCallback } from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { getInitialValues, validateIp } from './IpsFormUtils';
import { t } from 'modules/i18n/utils/intl';
import { IpsFormData, IpsFormFields, IpsFormProps } from './IpsFormTypes';
import { AddressInputField } from '../AddressInputField';
import { AddressFields } from '../AddressFields';

export const MAX_IP_COUNT = 10;

export const IpsForm = ({ data, onSubmit }: IpsFormProps) => {
  const onAddIp = useCallback(
    (values: IpsFormData) => {
      const { ip, ips } = values;

      if (ip) {
        onSubmit([...ips, ip]);
      }
    },
    [onSubmit],
  );

  const onDeleteIp = useCallback(
    (values: IpsFormData, index: number) => {
      const { ips } = values;

      const updatedIps = [...ips];

      if (index > -1) {
        updatedIps.splice(index, 1);
      }

      onSubmit(updatedIps);
    },
    [onSubmit],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<IpsFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <AddressInputField
              name={IpsFormFields.ip}
              validate={validateIp}
              onButtonClick={handleSubmit}
              buttonText={t('providers.endpoint.security.add-button')}
              isDisabled={data.length >= MAX_IP_COUNT}
            />
            {Array.isArray(values.ips) && values.ips?.length > 0 && (
              <AddressFields
                title={t('providers.endpoint.security.ip.domains-title')}
                name={IpsFormFields.ips}
                onButtonClick={index => onDeleteIp(values, index)}
              />
            )}
          </FormGroup>
        </form>
      );
    },
    [onDeleteIp, data],
  );

  return (
    <Form
      onSubmit={onAddIp}
      render={renderForm}
      initialValues={getInitialValues(data)}
      mutators={{
        ...arrayMutators,
      }}
    />
  );
};
