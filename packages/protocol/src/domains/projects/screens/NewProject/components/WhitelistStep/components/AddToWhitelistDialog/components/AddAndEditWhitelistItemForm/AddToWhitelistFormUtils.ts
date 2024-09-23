import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t, tHTML } from '@ankr.com/common';

import { NewProjectStep } from 'domains/projects/types';
import { validateDomain } from 'modules/common/utils/validateDomain';
import { validateIp } from 'modules/common/utils/validateIp';
import { validateSmartContractAddress } from 'modules/common/utils/validateSmartContractAddress';
import { ISelectOption } from 'uiKit/Select';
import { NewProjectType } from 'domains/projects/store';

const intlKey = 'projects.add-whitelist-dialog';

export const whitelistTypeLabelMap = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return t(`${intlKey}.smart-contract`);
    case UserEndpointTokenMode.IP:
      return t(`${intlKey}.ip-address`);
    case UserEndpointTokenMode.REFERER:
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
  value: UserEndpointTokenMode;
}

export const getValidation = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems || []
          )
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.smart-contract-already-exist');
        }

        return validateSmartContractAddress(value);
      };

    case UserEndpointTokenMode.IP:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems || []
          )
            .map(item => item.value)
            .includes(value)
        ) {
          return t('validation.ip-already-exist');
        }

        return validateIp(value);
      };

    case UserEndpointTokenMode.REFERER:
      return (value: string, allValues: unknown) => {
        if (
          (
            (allValues as NewProjectType[NewProjectStep.Whitelist])
              ?.whitelistItems || []
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

export const getPlaceholder = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return t(`${intlKey}.enter-smart-contract`);
    case UserEndpointTokenMode.IP:
      return t(`${intlKey}.enter-ip`);
    case UserEndpointTokenMode.REFERER:
      return t(`${intlKey}.enter-domain`);
    default:
      return t(`${intlKey}.enter`);
  }
};

export const getLabel = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return t(`${intlKey}.smart-contract-label`);
    case UserEndpointTokenMode.IP:
      return t(`${intlKey}.ip-label`);
    case UserEndpointTokenMode.REFERER:
      return t(`${intlKey}.domain-label`);
    default:
      return '';
  }
};

export const getDialogDescription = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.IP:
    case UserEndpointTokenMode.REFERER:
    default:
      return tHTML(`${intlKey}.description-10`);
    case UserEndpointTokenMode.ADDRESS:
      return tHTML(`${intlKey}.address-description`);
  }
};

export const getSelectChainDescription = (type?: UserEndpointTokenMode) => {
  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return tHTML(`${intlKey}.select-chain-description-smart-contract`);
    case UserEndpointTokenMode.IP:
      return tHTML(`${intlKey}.select-chain-description-ip`);
    case UserEndpointTokenMode.REFERER:
      return tHTML(`${intlKey}.select-chain-description-domain`);

    default:
      return '';
  }
};
