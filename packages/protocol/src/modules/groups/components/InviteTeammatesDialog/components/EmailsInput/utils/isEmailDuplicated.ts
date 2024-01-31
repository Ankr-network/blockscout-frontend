export interface IsEmailDuplicatedParams {
  email: string;
  emails?: string[];
  index: number;
}

export const isEmailDuplicated = ({
  email,
  emails = [],
  index,
}: IsEmailDuplicatedParams) => {
  const foundIndex = emails.findIndex(
    value => value.toLowerCase() === email.toLowerCase(),
  );
  const isDuplicate = foundIndex > -1 && foundIndex < index;

  return isDuplicate;
};
