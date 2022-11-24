const MAX_EMAIL_LENGTH = 12;

export const shrinkEmailAddress = (email?: string): string => {
  if (!email) return '';

  if (email.length <= MAX_EMAIL_LENGTH) {
    return email;
  }

  const [name, domain] = email.split('@');

  const firstNameSymbol = name[0];
  const lastNameSymbol = name[name.length - 1];

  return `${firstNameSymbol}…${lastNameSymbol}@${domain}`;
};
