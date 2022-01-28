type Tags = 'beginner';
export type GlossaryValue = {
  termId: string;
  value: string;
  tags: Tags[];
  quote: string;
  description?: string[];
  connectedTerms?: string[];
  relatedContent?: string[];
};
export type GlossaryMock = { [key: string]: GlossaryValue };
