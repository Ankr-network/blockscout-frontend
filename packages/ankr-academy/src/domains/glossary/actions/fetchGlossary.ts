import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { glossaryResponseMock } from '../api/glossaryResponseMock';
import { FetchGlossaryResponseData, GlossaryMappedData } from '../types';
import { mapGlossaryData } from '../api/mapGlossaryData';

/**
 * request from strapi admin panel
 */

export const fetchGlossary = createSmartAction<
  RequestAction<FetchGlossaryResponseData, GlossaryMappedData>
>('academy/fetchGlossary', () =>
  // using mock response data if REACT_APP_IS_GLOSSARY_MOCK_AVAILABLE in .env
  process.env.REACT_APP_IS_GLOSSARY_MOCK_AVAILABLE
    ? {
        request: {
          response: glossaryResponseMock,
        },
        meta: {
          driver: 'mock',
          getData: mapGlossaryData,
        },
      }
    : {
        request: {
          url: `/glossaries?populate[GlossaryItems][populate]=*`,
          method: 'get',
        },
        meta: {
          driver: 'axios',
          asMutation: false,
          showNotificationOnError: true,
          getData: mapGlossaryData,
        },
      },
);
