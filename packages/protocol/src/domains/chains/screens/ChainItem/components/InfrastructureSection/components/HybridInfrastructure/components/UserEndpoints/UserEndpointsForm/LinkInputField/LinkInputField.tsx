import React, { useCallback, useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Field, useForm } from 'react-final-form';
import { t } from '@ankr.com/common';

import { InputField } from 'modules/form/components/InputField/InputField';
import { validateUserEndpoint } from 'domains/chains/screens/AddEndpoint/components/AddEndpointForm/EndpointForm/EndpointFormUtils';

import { useStyles } from './LinkInputFieldStyles';

interface LinkInputFieldProps {
  name: string;
  value: string;
  onSubmit: () => void;
  chainId: string;
  isReadOnly: boolean;
  setIsReadOnly: (isReadOnly: boolean) => void;
  privateUrls: string[];
  publicUrls: string[];
  endpoints: string[];
}

export const LinkInputField = ({
  chainId,
  endpoints,
  isReadOnly,
  name,
  onSubmit,
  privateUrls,
  publicUrls,
  setIsReadOnly,
  value,
}: LinkInputFieldProps) => {
  const form = useForm();
  const { classes } = useStyles();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEditClick = useCallback(() => {
    setIsReadOnly(false);
    inputRef.current?.focus();
    form.mutators.setFieldTouched(name, true);
  }, [form, name, setIsReadOnly]);

  const onCancelClick = useCallback(() => {
    setIsReadOnly(true);

    form.change(name, value);

    form.restart();
    // eslint-disable-next-line
  }, [form, setIsReadOnly]);

  const onSaveClick = useCallback(() => {
    setIsReadOnly(true);

    onSubmit();
  }, [onSubmit, setIsReadOnly]);

  return (
    <Field
      component={InputField}
      name={name}
      variant="outlined"
      placeholder="https://"
      validate={(data, _v, meta) =>
        meta?.modified &&
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
          root: classes.root,
        },
        endAdornment: isReadOnly ? (
          <Button
            variant="text"
            className={classes.editButton}
            onClick={onEditClick}
          >
            {t('providers.editable-endpoints.edit')}
          </Button>
        ) : (
          <>
            <Button
              variant="text"
              className={classes.editButton}
              onClick={onCancelClick}
            >
              {t('providers.editable-endpoints.cancel')}
            </Button>
            <Button
              variant="text"
              disabled={form.getState().validating || !form.getState().valid}
              className={classes.editButton}
              onClick={onSaveClick}
            >
              {form.getState().validating ? (
                <CircularProgress size={14} />
              ) : (
                t('providers.editable-endpoints.save')
              )}
            </Button>
          </>
        ),
        readOnly: isReadOnly,
        inputRef,
      }}
    />
  );
};
