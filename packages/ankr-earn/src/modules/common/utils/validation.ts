import { ValidationErrors } from 'final-form';
import set from 'lodash/set';
import { AnySchema, ValidationError } from 'yup';

export type TValidationHandler = (
  values: unknown,
) => Promise<ValidationErrors | undefined>;

export const validate: (schema: AnySchema) => TValidationHandler =
  (schema: AnySchema) => async (values: unknown) =>
    schema
      .validate(values, {
        abortEarly: false,
        stripUnknown: true,
        recursive: true,
      })
      .then(() => undefined)
      .catch((error: ValidationError) =>
        error.inner?.reduce(
          (errors: ValidationErrors, err: ValidationError) =>
            set({ ...errors }, err.path as string, err.message),
          {},
        ),
      );
