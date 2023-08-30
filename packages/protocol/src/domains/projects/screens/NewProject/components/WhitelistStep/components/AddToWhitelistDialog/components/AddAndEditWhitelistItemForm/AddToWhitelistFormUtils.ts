import { t } from '@ankr.com/common';

import { WhiteListItem } from 'domains/projects/types';
import { validateDomain } from 'modules/common/utils/validateDomain';
import { validateIp } from 'modules/common/utils/validateIp';
import { validateSmartContractAddress } from 'modules/common/utils/validateSmartContractAddress';
import { ISelectOption } from 'uiKit/Select';
import { AddToWhitelistFormData } from 'domains/projects/store';

export const whitelistTypeLabelMap = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return t('projects.add-whitelist-dialog.smart-contract');
    case WhiteListItem.ip:
      return t('projects.add-whitelist-dialog.ip-address');
    case WhiteListItem.referer:
      return t('projects.add-whitelist-dialog.domain');
    default:
      return '';
  }
};

export enum AddToWhitelistFormFields {
  chains = 'whitelistDialog.chains',
  type = 'whitelistDialog.type',
  value = 'whitelistDialog.value',
}

export interface IWhiteListSelectOption extends ISelectOption {
  value: WhiteListItem;
}

interface GetTypeOptionsArgs {
  isAddingDomainAllowed: boolean;
  isAddingIPAllowed: boolean;
  isAddingSmartContractAllowed: boolean;
}

export const getOptionsByWhitelistTypes = ({
  isAddingDomainAllowed,
  isAddingIPAllowed,
  isAddingSmartContractAllowed,
}: GetTypeOptionsArgs): IWhiteListSelectOption[] => {
  const options: IWhiteListSelectOption[] = [];

  options.push({
    disabled: !isAddingDomainAllowed,
    label: whitelistTypeLabelMap(WhiteListItem.referer),
    value: WhiteListItem.referer,
  });

  options.push({
    disabled: !isAddingIPAllowed,
    label: whitelistTypeLabelMap(WhiteListItem.ip),
    value: WhiteListItem.ip,
  });

  options.push({
    disabled: !isAddingSmartContractAllowed,
    label: whitelistTypeLabelMap(WhiteListItem.address),
    value: WhiteListItem.address,
  });

  return options;
};

export const getValidation = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return (value: string, allValues: any) => {
        if (
          (allValues?.whitelistItems as AddToWhitelistFormData[])
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.smart-contract-already-exist');
        }

        return validateSmartContractAddress(value);
      };

    case WhiteListItem.ip:
      return (value: string, allValues: any) => {
        if (
          (allValues?.whitelistItems as AddToWhitelistFormData[])
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.ip-already-exist');
        }

        return validateIp(value);
      };

    case WhiteListItem.referer:
      return (value: string, allValues: any) => {
        if (
          (allValues?.whitelistItems as AddToWhitelistFormData[])
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.domain-already-exist');
        }

        return validateDomain(value);
      };

    default:
      return () => undefined;
  }
};
