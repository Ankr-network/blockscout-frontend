import { TPrimitive } from '../types';

export const getUniqueArray = <Item extends TPrimitive>(items: Item[]) => [
  ...new Set(items),
];
