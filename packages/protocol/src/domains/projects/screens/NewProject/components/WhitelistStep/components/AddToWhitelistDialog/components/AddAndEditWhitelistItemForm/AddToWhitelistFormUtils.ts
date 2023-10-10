import { t, tHTML } from '@ankr.com/common';

import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { validateDomain } from 'modules/common/utils/validateDomain';
import { validateIp } from 'modules/common/utils/validateIp';
import { validateSmartContractAddress } from 'modules/common/utils/validateSmartContractAddress';
import { ISelectOption } from 'uiKit/Select';
import { NewProjectType } from 'domains/projects/store';

const intlKey = 'projects.add-whitelist-dialog';

export const whitelistTypeLabelMap = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return t(`${intlKey}.smart-contract`);
    case WhiteListItem.ip:
      return t(`${intlKey}.ip-address`);
    case WhiteListItem.referer:
      return t(`${intlKey}.domain`);
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

export const getValidation = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems ?? []
          )
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.smart-contract-already-exist');
        }

        return validateSmartContractAddress(value);
      };

    case WhiteListItem.ip:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems ?? []
          )
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.ip-already-exist');
        }

        return validateIp(value);
      };

    case WhiteListItem.referer:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems ?? []
          )
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

export const getPlaceholder = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return t(`${intlKey}.enter-smart-contract`);
    case WhiteListItem.ip:
      return t(`${intlKey}.enter-ip`);
    case WhiteListItem.referer:
      return t(`${intlKey}.enter-domain`);
    default:
      return t(`${intlKey}.enter`);
  }
};

export const getLabel = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return t(`${intlKey}.smart-contract-label`);
    case WhiteListItem.ip:
      return t(`${intlKey}.ip-label`);
    case WhiteListItem.referer:
      return t(`${intlKey}.domain-label`);
    default:
      return '';
  }
};

export const getDialogDescription = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.ip:
    case WhiteListItem.referer:
    default:
      return tHTML(`${intlKey}.description-10`);
    case WhiteListItem.address:
      return tHTML(`${intlKey}.description-5`);
  }
};

export const getSelectChainDescription = (type?: WhiteListItem) => {
  switch (type) {
    case WhiteListItem.address:
      return tHTML(`${intlKey}.select-chain-description-smart-contract`);
    case WhiteListItem.ip:
      return tHTML(`${intlKey}.select-chain-description-ip`);
    case WhiteListItem.referer:
      return tHTML(`${intlKey}.select-chain-description-domain`);
    default:
      return '';
  }
};
