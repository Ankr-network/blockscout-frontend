import { ChipsTextField, TextFieldProps } from '@ankr.com/ui';
import { useMemo } from 'react';

import { OnEmailsInputChange } from './types';
import { chipProps, forbiddenSymbols, separators } from './constants';
import { getTextFieldProps } from './utils/getTextFieldProps';
import { useEmailsCount } from './hooks/useEmailsCount';
import { useGetChipsProps } from './hooks/useGetChipsProps';

export interface EmailsInputProps {
  className?: string;
  errorMessage?: string;
  invitedEmails: string[];
  onChange?: OnEmailsInputChange;
  teamMembersCount: number;
  teamMembersLimit: number;
  value: string[];
}

export const EmailsInput = ({
  className,
  errorMessage,
  invitedEmails,
  onChange: handleChange,
  teamMembersCount,
  teamMembersLimit,
  value,
}: EmailsInputProps) => {
  const { emailsCount, invalidEmailsCount, onChange } = useEmailsCount({
    handleChange,
    invitedEmails,
    teamMembersCount,
  });

  const getChipsProps = useGetChipsProps({ invitedEmails });

  const textfieldProps = useMemo<TextFieldProps>(
    () => getTextFieldProps({ emailsCount, errorMessage, teamMembersLimit }),
    [emailsCount, errorMessage, teamMembersLimit],
  );

  const maxLength = teamMembersLimit - teamMembersCount + invalidEmailsCount;

  return (
    <ChipsTextField
      allowIdenticalChips
      chipProps={chipProps}
      className={className}
      forbiddenSymbols={forbiddenSymbols}
      getChipProps={getChipsProps}
      maxLength={maxLength}
      onChange={onChange}
      separators={separators}
      textFieldProps={textfieldProps}
      value={value}
    />
  );
};
