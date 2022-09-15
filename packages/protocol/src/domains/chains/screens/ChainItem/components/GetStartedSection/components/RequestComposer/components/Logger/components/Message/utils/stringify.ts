export const stringify = (object: unknown) =>
  object instanceof Error ? object.toString() : JSON.stringify(object);
