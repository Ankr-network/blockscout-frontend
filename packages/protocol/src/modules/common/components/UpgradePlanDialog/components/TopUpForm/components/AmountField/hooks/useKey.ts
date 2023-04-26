import { FieldValidator } from 'final-form';
import { useEffect, useState } from 'react';

// We have to use a unique key prop every time validation function has changed
// to preform validation on mount.
// See https://final-form.org/docs/react-final-form/types/FieldProps#validate
export const useKey = (validate: FieldValidator<string>) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(value => ++value);
  }, [validate]);

  return key;
};
