export interface IValidationOptions {
  validateRequirement?: boolean;
}

export type ValidateAmount = (
  amount: string,
  options?: IValidationOptions,
) => string | undefined;
