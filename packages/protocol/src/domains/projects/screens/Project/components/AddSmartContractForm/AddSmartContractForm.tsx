import { ChangeEventHandler } from 'react';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { WhitelistItemsCounter } from 'domains/projects/components/WhitelistItemsCounter';
import { ContractAttention } from 'domains/projects/components/ContractAttention';

import {
  WhitelistItemChainsSelector,
  WhitelistItemChainsSelectorProps,
} from '../WhitelistItemChainsSelector';
import { WhitelistItemForm } from '../WhitelistItemForm';
import { WhitelistItemInput } from '../WhitelistItemInput';

export interface AddSmartContractFormProps
  extends Omit<WhitelistItemChainsSelectorProps, 'description' | 'isValid'> {
  address: string;
  inputError?: string;
  isAddressValid: boolean;
  isSelectorValid: boolean;
  onAddressChange: ChangeEventHandler<HTMLInputElement>;
  smartContractsCount: number;
}

const type = UserEndpointTokenMode.ADDRESS;

export const AddSmartContractForm = ({
  address,
  handleSelectBlockchain,
  inputError,
  isAddressValid,
  isSelectorValid,
  onAddressChange,
  selectedBlockchains,
  smartContractsCount,
  subchains,
}: AddSmartContractFormProps) => {
  return (
    <WhitelistItemForm
      attention={<ContractAttention />}
      counter={
        <WhitelistItemsCounter count={smartContractsCount} type={type} />
      }
      description={t('project.add-smart-contract-form.description')}
      input={
        <WhitelistItemInput
          error={!isAddressValid}
          helperText={inputError}
          label={t('project.add-smart-contract-form.input.label')}
          onChange={onAddressChange}
          placeholder={t('project.add-smart-contract-form.input.placeholder')}
          value={address}
        />
      }
      selector={
        <WhitelistItemChainsSelector
          areNonEVMSubchainsDisabled
          description={t(
            'project.add-smart-contract-form.chains-selector.description',
          )}
          handleSelectBlockchain={handleSelectBlockchain}
          isValid={isSelectorValid}
          selectedBlockchains={selectedBlockchains}
          selectionLimit={1}
          subchains={subchains}
        />
      }
      title={t('project.add-smart-contract-form.title')}
    />
  );
};
