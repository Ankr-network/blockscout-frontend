import React, { useCallback } from 'react';
import { FormGroup, Box } from '@material-ui/core';
import { Form, FormRenderProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import setFieldTouched from 'final-form-set-field-touched';

import { useStyles } from './UserEndpointsFormStyles';
import { getInitialValues } from './UserEndpointsFormUtils';

import {
  UserEndpointsFormData,
  UserEndpointsFormFields,
  UserEndpointsProps,
} from './UserEndpointsFormTypes';
import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';
import { RowInputField } from './RowInputField';
import { Mutator } from 'final-form';

export const UserEndpointsForm = ({
  endpoints,
  chainId,
  onSubmit: onUpdateEndpoint,
}: UserEndpointsProps) => {
  const classes = useStyles();

  const onSubmit = useCallback(
    (updatedEndpoint?: IUserEndpoint) => {
      onUpdateEndpoint(updatedEndpoint);
    },
    [onUpdateEndpoint],
  );

  const renderForm = useCallback(
    ({ form, handleSubmit }: FormRenderProps<UserEndpointsFormData>) => {
      return (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Box className={classes.root}>
              <FieldArray<IUserEndpoint>
                name={UserEndpointsFormFields.rpcLinks}
              >
                {({ fields }) =>
                  fields.map((name, index) => {
                    const formEndpoint = fields.value[index];
                    const { requestUrl } = formEndpoint;

                    const onInputSubmit = () => {
                      form.submit();
                      const { errors } = form.getState();

                      if (!errors?.rpcLinks?.[index]) {
                        const links = form.getFieldState(
                          UserEndpointsFormFields.rpcLinks,
                        )?.value;

                        const updatedEndpoint = links?.[index];

                        onSubmit(updatedEndpoint);
                      }
                    };

                    return (
                      <RowInputField
                        key={index}
                        requestUrl={requestUrl}
                        name={`${name}.requestUrl`}
                        chainId={chainId}
                        formEndpoint={formEndpoint}
                        onSubmit={onInputSubmit}
                      />
                    );
                  })
                }
              </FieldArray>
            </Box>
          </FormGroup>
        </form>
      );
    },
    [classes.root, onSubmit, chainId],
  );

  return (
    <Form
      onSubmit={() => undefined}
      render={renderForm}
      initialValues={getInitialValues(endpoints)}
      mutators={{
        ...arrayMutators,
        ...({ setFieldTouched } as {
          setFieldTouched: Mutator<UserEndpointsFormData>;
        }),
      }}
    />
  );
};
