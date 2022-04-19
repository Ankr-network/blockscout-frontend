import React, { useCallback } from 'react';
import { FormGroup } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { getInitialValues, validateDomain } from './DomainsFormUtils';
import {
  DomainsFormData,
  DomainsFormFields,
  DomainsFormProps,
} from './DomainsFormTypes';
import { AddressInputField } from '../AddressInputField';
import { AddressFields } from '../AddressFields';
import { t } from 'modules/i18n/utils/intl';

export const MAX_DOMAIN_COUNT = 10;

export const DomainsForm = ({ data, onSubmit }: DomainsFormProps) => {
  const onAddDomain = useCallback(
    (values: DomainsFormData) => {
      const { domain, domains } = values;

      if (domain) {
        onSubmit([...domains, domain]);
      }
    },
    [onSubmit],
  );

  const onDeleteDomain = useCallback(
    (values: DomainsFormData, index: number) => {
      const { domains } = values;

      const updatedDomains = [...domains];

      if (index > -1) {
        updatedDomains.splice(index, 1);
      }

      onSubmit(updatedDomains);
    },
    [onSubmit],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values }: FormRenderProps<DomainsFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <AddressInputField
              name={DomainsFormFields.domain}
              validate={validateDomain}
              onButtonClick={handleSubmit}
              buttonText={t('providers.endpoint.security.add-button')}
              isDisabled={data.length >= MAX_DOMAIN_COUNT}
            />
            {Array.isArray(values.domains) && values.domains?.length > 0 && (
              <AddressFields
                title={t('providers.endpoint.security.domain.domains-title')}
                name={DomainsFormFields.domains}
                onButtonClick={index => onDeleteDomain(values, index)}
              />
            )}
          </FormGroup>
        </form>
      );
    },
    [onDeleteDomain, data],
  );

  return (
    <Form
      onSubmit={onAddDomain}
      render={renderForm}
      initialValues={getInitialValues(data)}
      mutators={{
        ...arrayMutators,
      }}
    />
  );
};
