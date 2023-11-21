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

export interface EditDomainFormProps
  extends Omit<WhitelistItemChainsSelectorProps, 'description' | 'isValid'> {
  domain: string;
  domainsCount: number;
  inputError?: string;
  isDomainValid: boolean;
  isSelectorValid: boolean;
  onDomainChange: ChangeEventHandler<HTMLInputElement>;
}

const type = UserEndpointTokenMode.REFERER;

export const EditDomainForm = ({
  domain,
  domainsCount,
  handleSelectBlockchain,
  inputError,
  isDomainValid,
  isSelectorValid,
  onDomainChange,
  selectedBlockchains,
  subchains,
}: EditDomainFormProps) => {
  return (
    <WhitelistItemForm
      counter={<WhitelistItemsCounter count={domainsCount} type={type} />}
      description={t('project.edit-domain-form.description')}
      input={
        <WhitelistItemInput
          error={!isDomainValid}
          helperText={inputError}
          label={t('project.edit-domain-form.input.label')}
          onChange={onDomainChange}
          placeholder={t('project.edit-domain-form.input.placeholder')}
          value={domain}
        />
      }
      selector={
        <WhitelistItemChainsSelector
          description={t(
            'project.edit-domain-form.chains-selector.description',
          )}
          handleSelectBlockchain={handleSelectBlockchain}
          isValid={isSelectorValid}
          selectedBlockchains={selectedBlockchains}
          subchains={subchains}
        />
      }
      title={t('project.edit-domain-form.title')}
    />
  );
};
