import React, { useState, useEffect, useCallback } from 'react';
import { FormSpy } from 'react-final-form';
import isEqual from 'lodash.isequal';

import { Preloader } from 'uiKit/Preloader';

import {
  FormAutoSubmitFormSpyProps,
  FormAutoSubmitProps,
} from './FormAutoSubmit.types';

const FormAutoSubmitFormSpy = ({
  timeout,
  onSubmit,
  values,
  showSubmitting,
}: FormAutoSubmitFormSpyProps) => {
  const [lastSubmitValues, setLastSubmitValues] = useState(values);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = useCallback(async () => {
    const hasChanges = !isEqual(lastSubmitValues, values);

    if (!hasChanges) return;

    await setLastSubmitValues(values);
    await setSubmitting(true);

    if (typeof onSubmit === 'function') {
      await onSubmit(values);
    }

    await setSubmitting(false);
  }, [onSubmit, values, lastSubmitValues]);

  useEffect(() => {
    const timer = setTimeout(() => {
      submit();
    }, timeout);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [submit, timeout]);

  return isSubmitting && showSubmitting ? <Preloader /> : <></>;
};

export const FormAutoSubmit = (props: FormAutoSubmitProps) => (
  <FormSpy
    {...props}
    subscription={{ values: true }}
    component={FormAutoSubmitFormSpy}
  />
);
