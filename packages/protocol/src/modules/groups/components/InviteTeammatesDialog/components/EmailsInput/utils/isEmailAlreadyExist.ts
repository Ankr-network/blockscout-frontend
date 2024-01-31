export interface IIsEmailAlreadyExist {
  email: string;
  invitedEmails: string[];
}
export const isEmailAlreadyExist = ({
  email,
  invitedEmails,
}: IIsEmailAlreadyExist) =>
  invitedEmails.map(value => value.toLowerCase()).includes(email.toLowerCase());
