export const stringify = (object: unknown) =>
  object instanceof Error ? object.toString() : JSON.stringify(object);

export const MAX_MESSAGE_LENGTH = 10 ** 4;
