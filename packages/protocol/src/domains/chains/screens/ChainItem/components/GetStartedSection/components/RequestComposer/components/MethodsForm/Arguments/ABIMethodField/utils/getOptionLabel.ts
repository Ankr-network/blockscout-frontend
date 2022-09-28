import { ABIItem } from 'domains/requestComposer/types';

export const getOptionLabel = ({ inputs, name }: ABIItem) => {
  const args = inputs?.map(({ type }) => type).join(', ') ?? '';

  return `${name}${args ? ` (${args})` : ''}`;
};
