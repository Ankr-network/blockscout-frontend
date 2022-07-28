import { ValidationError, Validator } from '../../types';

export const composeValidators =
  <V>(...validators: Validator<V>[]) =>
  (value: V) =>
    validators.reduce<ValidationError>(
      (error, validator) => error || validator(value),
      undefined,
    );
