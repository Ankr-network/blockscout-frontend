const MAX_NON_EXPANDABLE_CODE_LENGTH = 21;

export const isCodeExpandable = (code: string) =>
  code.split('\n').length > MAX_NON_EXPANDABLE_CODE_LENGTH;
