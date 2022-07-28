export type ValidationError = string | undefined;

export type Validator<V = unknown> = (value?: V) => ValidationError;
