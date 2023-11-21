import { ChangeEventHandler } from 'react';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { WhitelistItemsCounter } from 'domains/projects/components/WhitelistItemsCounter';

import {
  WhitelistItemChainsSelector,
  WhitelistItemChainsSelectorProps,
} from '../WhitelistItemChainsSelector';
import { WhitelistItemForm } from '../WhitelistItemForm';
import { WhitelistItemInput } from '../WhitelistItemInput';

export interface AddIPFormProps
  extends Omit<WhitelistItemChainsSelectorProps, 'description' | 'isValid'> {
  ip: string;
  ipsCount: number;
  inputError?: string;
  isIPValid: boolean;
  isSelectorValid: boolean;
  onIPChange: ChangeEventHandler<HTMLInputElement>;
}

const type = UserEndpointTokenMode.IP;

export const AddIPForm = ({
  handleSelectBlockchain,
  inputError,
  ip,
  ipsCount,
  isIPValid,
  isSelectorValid,
  onIPChange,
  selectedBlockchains,
  subchains,
}: AddIPFormProps) => {
  return (
    <WhitelistItemForm
      counter={<WhitelistItemsCounter count={ipsCount} type={type} />}
      description={t('project.add-ip-form.description')}
      input={
        <WhitelistItemInput
          error={!isIPValid}
          helperText={inputError}
          label={t('project.add-ip-form.input.label')}
          onChange={onIPChange}
          placeholder={t('project.add-ip-form.input.placeholder')}
          value={ip}
        />
      }
      selector={
        <WhitelistItemChainsSelector
          description={t('project.add-ip-form.chains-selector.description')}
          handleSelectBlockchain={handleSelectBlockchain}
          isValid={isSelectorValid}
          selectedBlockchains={selectedBlockchains}
          subchains={subchains}
        />
      }
      title={t('project.add-ip-form.title')}
    />
  );
};
