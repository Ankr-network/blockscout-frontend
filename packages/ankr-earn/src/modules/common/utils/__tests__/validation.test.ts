import { object, number } from 'yup';

import { validate } from '../validation';

describe('services/validation', () => {
  const MAX = 10;
  const SCHEMA = object({
    amount: number()
      .typeError('nan-error')
      .required('required')
      .positive('greater-zero')
      .max(MAX, 'max'),
  });

  const handler = validate(SCHEMA);

  test('should validate object and return validation error', async () => {
    const result = await handler({});

    expect(result).toStrictEqual({
      amount: 'required',
    });

    const negativeResult = await handler({
      amount: -1,
    });

    expect(negativeResult).toStrictEqual({
      amount: 'greater-zero',
    });
  });

  test('should return type error', async () => {
    const result = await handler({
      amount: 'wrong',
    });

    expect(result).toStrictEqual({
      amount: 'nan-error',
    });
  });

  test('should return max error', async () => {
    const result = await handler({
      amount: 11,
    });

    expect(result).toStrictEqual({
      amount: 'max',
    });
  });

  test('should return undefined if object is valid', async () => {
    const result = await handler({
      amount: 10,
    });

    expect(result).toBeUndefined();
  });
});
