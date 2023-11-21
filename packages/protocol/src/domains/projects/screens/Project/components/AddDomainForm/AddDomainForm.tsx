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

export interface AddDomainFormProps
  extends Omit<WhitelistItemChainsSelectorProps, 'description' | 'isValid'> {
  domain: string;
  domainsCount: number;
  inputError?: string;
  isDomainValid: boolean;
  isSelectorValid: boolean;
  onDomainChange: ChangeEventHandler<HTMLInputElement>;
}

const type = UserEndpointTokenMode.REFERER;

export const AddDomainForm = ({
  domain,
  domainsCount,
  handleSelectBlockchain,
  inputError,
  isDomainValid,
  isSelectorValid,
  onDomainChange,
  selectedBlockchains,
  subchains,
}: AddDomainFormProps) => {
  return (
    <WhitelistItemForm
      counter={<WhitelistItemsCounter count={domainsCount} type={type} />}
      description={t('project.add-domain-form.description')}
      input={
        <WhitelistItemInput
          error={!isDomainValid}
          helperText={inputError}
          label={t('project.add-domain-form.input.label')}
          onChange={onDomainChange}
          placeholder={t('project.add-domain-form.input.placeholder')}
          value={domain}
        />
      }
      selector={
        <WhitelistItemChainsSelector
          description={t('project.add-domain-form.chains-selector.description')}
          handleSelectBlockchain={handleSelectBlockchain}
          isValid={isSelectorValid}
          selectedBlockchains={selectedBlockchains}
          subchains={subchains}
        />
      }
      title={t('project.add-domain-form.title')}
    />
  );
};
