import { TextFieldProps } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { renderCounter } from './renderCounter';

export interface GetTextFieldPropsParams {
  emailsCount: number;
  errorMessage?: string;
  teamMembersLimit: number;
}

export const getTextFieldProps = ({
  emailsCount,
  errorMessage,
  teamMembersLimit,
}: GetTextFieldPropsParams): Partial<TextFieldProps> => ({
  endLabel: renderCounter({ count: emailsCount, limit: teamMembersLimit }),
  error: Boolean(errorMessage),
  fullWidth: true,
  helperText: errorMessage,
  label: t('teams.invite-teammates-dialog.emails-input.title'),
  multiline: true,
  placeholder: t('teams.invite-teammates-dialog.emails-input.placeholder'),
});
