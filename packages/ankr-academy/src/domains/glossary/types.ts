import { glossaryResponseMock } from './api/glossaryResponseMock';

type Tags = 'beginner';
export type GlossaryMappedValue = {
  termId: string;
  value: string;
  tags: Tags[];
  quote: string;
  description?: string[];
  connectedTerms?: string[];
  relatedContent?: string[];
  key: string;
};
export type GlossaryMappedData = { [key: string]: GlossaryMappedValue };

/* glossary response from strapi typings */
type GlossaryItemResponse = {
  id: string;
  key: string;
  termId: string;
  value: string;
  tags: { id: number; tag: string }[];
  quote: string;
  description: { id: number; description: string }[];
  connectedTerms: { id: number; connectedTerm: string }[];
  relatedContent: { id: number; relatedContent: string }[];
};
type FetchGlossaryResponseDataItem = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    GlossaryItems: GlossaryItemResponse[];
  };
};
export type FetchGlossaryResponseData = {
  data: FetchGlossaryResponseDataItem[];
  meta: typeof glossaryResponseMock.data.meta;
};
