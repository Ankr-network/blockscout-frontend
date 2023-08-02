import React, { useCallback } from 'react';
import { Button, FormGroup, Typography } from '@mui/material';
import { Field, useForm } from 'react-final-form';
import { t, tHTML } from '@ankr.com/common';

import { InputField } from 'modules/form/components/InputField/InputField';
import { isFirefox } from 'modules/common/utils/browserDetect';

import { useStyles } from './EndpointFormStyles';
import { AddEndpointFormFields } from '../AddEndpointFormTypes';
import { validateUserEndpoint } from './EndpointFormUtils';

interface EndpointFormProps {
  chainId: string;
  privateUrls: string[];
  publicUrls: string[];
  endpoints: string[];
}

const SHOULD_SHOW = true;
// https://stackoverflow.com/questions/67440036/navigator-clipboard-readtext-is-not-working-in-js
const canShowPasteButton = SHOULD_SHOW || !isFirefox();

export const EndpointForm = ({
  chainId,
  privateUrls,
  publicUrls,
  endpoints,
}: EndpointFormProps) => {
  const form = useForm();
  const { classes } = useStyles();

  const onPasteClick = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();

      form.change(AddEndpointFormFields.httpAddress, text);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [form]);

  return (
    <FormGroup>
      <Field
        component={InputField}
        name={AddEndpointFormFields.httpAddress}
        className={classes.httpAddress}
        isHelperTextVisible
        variant="outlined"
        placeholder="https://"
        defaultValue="https://"
        validate={data =>
          validateUserEndpoint({
            value: data,
            chainId,
            privateUrls,
            endpoints,
            publicUrls,
          })
        }
        InputProps={{
          classes: {
            root: classes.inputBase,
          },
          endAdornment: canShowPasteButton ? (
            <Button
              variant="text"
              className={classes.pasteButton}
              onClick={onPasteClick}
            >
              {t('providers.editable-endpoints.paste')}
            </Button>
          ) : null,
        }}
        label={
          <Typography
            className={classes.text}
            variant="caption"
            color="textPrimary"
          >
            {tHTML('providers.add-endpoint.http-input')}
          </Typography>
        }
      />
    </FormGroup>
  );
};
