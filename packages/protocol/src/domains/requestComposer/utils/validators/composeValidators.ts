export const composeValidators =
  (...validators: ((input: string) => boolean)[]) =>
  (input = '') =>
    validators.reduce(
      (isValid, validator) => isValid || validator(input),
      false,
    );
