import { Field, Subfield } from '../types';
import { concat } from './concat';

export const getSubfieldsParams = (name: string, subfields: Subfield[]) =>
  subfields.map<Field>(({ description, placeholder, validate }, index) => ({
    name: concat(name, index + 1),
    placeholder,
    helperText: description,
    validate,
  }));
