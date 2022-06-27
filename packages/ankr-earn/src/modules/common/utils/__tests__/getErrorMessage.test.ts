import { ErrorProps } from '@redux-requests/react';

import { t } from 'common';

import { ERR_MSG, getErrorMessage } from '../getErrorMessage';

describe('modules/common/utils/getErrorMessage', () => {
  const TEST_MSG = 'Test';

  describe('Standard Error Test Cases', () => {
    it('Invalid Error message', () => {
      const err = new Error(`${ERR_MSG}${TEST_MSG}`);

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('Valid Error message', () => {
      const err = new Error(TEST_MSG);

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });
  });

  describe('Redux-Requests Test Cases', () => {
    it('Default state', () => {
      expect(getErrorMessage({})).toBe(t('error.unknown'));
    });

    it('It has a "message" property', () => {
      const err: ErrorProps = {
        message: TEST_MSG,
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('It has an "error.error" property as a "string"', () => {
      const err: ErrorProps = {
        error: {
          error: TEST_MSG,
        },
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('It has an "error.error" property as an "object"', () => {
      const err: ErrorProps = {
        error: {
          error: new Error(TEST_MSG),
        },
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('It has an "error.response.data.message" property as a "string"', () => {
      const err: ErrorProps = {
        error: {
          response: {
            data: {
              message: TEST_MSG,
            },
          },
        },
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('It has an "error.message" property as a "string"', () => {
      const err: ErrorProps = {
        error: {
          message: TEST_MSG,
        },
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });

    it('It has an "error" property as an Error', () => {
      const err: ErrorProps = {
        error: new Error(TEST_MSG),
      };

      expect(getErrorMessage(err)).toBe(TEST_MSG);
    });
  });
});
