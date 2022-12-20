import { Box, FormGroup } from '@material-ui/core';
import { FieldArray } from 'react-final-form-arrays';
import { Form, FormRenderProps } from 'react-final-form';
import { Mutator } from 'final-form';
import { useCallback } from 'react';
import arrayMutators from 'final-form-arrays';
import setFieldTouched from 'final-form-set-field-touched';

import { RowInputField } from './RowInputField';
import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import {
  UserEndpointsFormData,
  UserEndpointsFormFields,
  UserEndpointsProps,
} from './UserEndpointsFormTypes';
import { getInitialValues, getRpcLinks } from './UserEndpointsFormUtils';
import { useStyles } from './UserEndpointsFormStyles';

export const UserEndpointsForm = ({
  endpoints,
  chainId,
  onSubmit: onUpdateEndpoint,
  privateUrls,
  publicUrls,
}: UserEndpointsProps) => {
  const classes = useStyles();

  const onSubmit = useCallback(
    (updatedEndpoint?: UserEndpoint) => {
      onUpdateEndpoint(updatedEndpoint);
    },
    [onUpdateEndpoint],
  );

  const renderForm = useCallback(
    ({
      form,
      handleSubmit,
      values,
    }: FormRenderProps<UserEndpointsFormData>) => {
      const rpcLinks = getRpcLinks(values.rpcLinks);

      return (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Box className={classes.root}>
              <FieldArray<UserEndpoint> name={UserEndpointsFormFields.rpcLinks}>
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
                        privateUrls={privateUrls}
                        endpoints={rpcLinks}
                        publicUrls={publicUrls}
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
    [classes.root, onSubmit, chainId, privateUrls, publicUrls],
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
