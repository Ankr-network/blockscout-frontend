type Primitive = bigint | boolean | null | number | string | symbol | undefined;

export const getUniqueArray = <Item extends Primitive>(items: Item[]) => [
  ...new Set(items),
];
