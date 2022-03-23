import React, { useCallback } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';

import { t } from 'modules/i18n/utils/intl';
import { AgreementForm } from './AgreementForm';
import { EndpointForm } from './EndpointForm';

import { AddEndpointFormData } from './AddEndpointFormTypes';
import { useStyles } from './AddEndpointFormStyles';
import { initialValues } from './AddEndpointFormUtils';

export interface AddEndpointFormProps {
  onSubmit: (httpAddress: string) => void;
  chainId: string;
  privateUrls: string[];
  publicUrls: string[];
  endpoints: string[];
}

export const AddEndpointForm = ({
  onSubmit,
  chainId,
  privateUrls,
  publicUrls,
  endpoints,
}: AddEndpointFormProps) => {
  const classes = useStyles();

  const onFormSubmit = useCallback(
    (data: AddEndpointFormData) => {
      onSubmit(data.httpAddress);
    },
    [onSubmit],
  );

  const renderForm = useCallback(
    ({ handleSubmit }: FormRenderProps<AddEndpointFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <EndpointForm
            chainId={chainId}
            privateUrls={privateUrls}
            publicUrls={publicUrls}
            endpoints={endpoints}
          />
          <Divider className={classes.divider} />
          <AgreementForm />
        </form>
      );
    },
    [classes.divider, chainId, privateUrls, endpoints, publicUrls],
  );

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.theadText}
        >
          {t('providers.add-endpoint.description')}
        </Typography>
      </div>
      <Form
        onSubmit={onFormSubmit}
        render={renderForm}
        initialValues={initialValues}
        className={classes.bottom}
      />
    </div>
  );
};
